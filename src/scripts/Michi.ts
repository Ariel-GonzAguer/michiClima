// // cloudinary
// import { Cloudinary } from "@cloudinary/url-gen";
// import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { max } from "@cloudinary/url-gen/actions/roundCorners";
// import { ar1X1 } from "@cloudinary/url-gen/qualifiers/aspectRatio";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

// export default async function Michi(condicion: string) {
//   const cld = new Cloudinary({ cloud: { cloudName: "arielcloudinary" } });

//   let imgURL: string = "";
//   if (condicion) {
//     try {
//       const imgPrompted = cld
//         .image("october/sundae_1")
//         .effect(
//           generativeBackgroundReplace().prompt(`sky full of ${condicion}`)
//         )
//         .resize(auto().width(200).aspectRatio(ar1X1()).gravity(autoGravity()))
//         .roundCorners(max());
//       imgURL = imgPrompted.toURL();

//       return imgURL;
//     } catch (err) {
//       console.error("Error aplicando fondo:", err);
//     }
//   }
// }
