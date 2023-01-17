import { Injectable, Inject } from "@nestjs/common";

// @Injectable()
// export class CloudinaryService {
//   constructor(@Inject(Cloudinary) private cloudinary) {
//     this.cloudinary.config({
//       cloud_name: 'dr120q8r2',
//       api_key: '672521545637753',
//       api_secret: 'Jqkc3LhQ30Y_4Q1CJsNj5E0QezA'
//     });
//   }

//   onUpload(file: any, path: string) {
//     return new Promise((resolve, reject) => {
//       const stream = this.cloudinary.uploader.upload_stream({ folder: `jigbid/${path}/` }, (error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });

//       streamifier.createReadStream(file.buffer).pipe(stream);
//     });
//   }

//   async uploader(file: any, path: string) {
//     return await this.onUpload(file, path);
//   }
// }
