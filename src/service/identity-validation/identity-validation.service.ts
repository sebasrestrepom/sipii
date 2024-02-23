import { NotFoundException, Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

import { IdentityValidation } from './interfaces/identity-validation.interface';

import { UserRepository } from '../../repository/user.respository';

import { User } from '../../entities/user';

@Injectable()
export class IdentityValidationService {
  private s3: AWS.S3;
  constructor(private readonly userRepository: UserRepository) {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async execute(data: IdentityValidation): Promise<string> {
    const user = await this.findUser(data.document);

    const documentPhotoPath = await this.uploadImageToS3(
      data.documentPhoto,
      'document',
    );

    const selfiePhotoPath = await this.uploadImageToS3(
      data.selfiePhoto,
      'selfie',
    );
    const isValidated = await this.compareFaces(
      documentPhotoPath.key,
      selfiePhotoPath.key,
    );

    this.updateUser(
      user,
      isValidated,
      documentPhotoPath.url,
      selfiePhotoPath.url,
      data,
    );

    await this.userRepository.save(user);

    Logger.log('Validation status:', isValidated);

    return `Validation status: ${!!isValidated}`;
  }

  private async findUser(document: number) {
    const user = await this.userRepository.findByDocument(document);
    if (!user || user === null) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private updateUser(
    user: User,
    isValidated: boolean,
    documentPhotoUrl: string,
    selfiePhotoUrl: string,
    data: IdentityValidation,
  ) {
    Object.assign(user, {
      ...data,
      isValidated,
      documentPhoto: documentPhotoUrl,
      selfiePhoto: selfiePhotoUrl,
    });
  }

  private async uploadImageToS3(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ key: string; url: string }> {
    this.s3 = new AWS.S3();
    const uploadResult = await this.s3
      .upload({
        Bucket: process.env.AWS_IDENTITY_PHOTO_BUCKET_NAME,
        Body: file.buffer,
        Key: `${folder}/${Date.now()}-${file.originalname}`,
        ContentType: file.mimetype,
      })
      .promise();
    return { key: uploadResult.Key, url: uploadResult.Location };
  }

  private async compareFaces(
    documentPhotoUrl: string,
    selfiePhotoUrl: string,
  ): Promise<boolean> {
    const rekognition = new AWS.Rekognition();
    const params = {
      SourceImage: {
        S3Object: {
          Bucket: process.env.AWS_IDENTITY_PHOTO_BUCKET_NAME,
          Name: documentPhotoUrl,
        },
      },
      TargetImage: {
        S3Object: {
          Bucket: process.env.AWS_IDENTITY_PHOTO_BUCKET_NAME,
          Name: selfiePhotoUrl,
        },
      },
      SimilarityThreshold: 90,
    };
    try {
      const compareFacesResult = await rekognition
        .compareFaces(params)
        .promise();
      return (
        compareFacesResult.FaceMatches?.length > 0 &&
        compareFacesResult.FaceMatches[0].Similarity >= 90
      );
    } catch (error) {
      Logger.error('Error comparing faces:', error);
      return false;
    }
  }
}
