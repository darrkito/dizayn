const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "jokgvv6c";

export function cloudinaryUrl(publicId: string, width: number) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,c_limit,w_${width}/${publicId}`;
}
