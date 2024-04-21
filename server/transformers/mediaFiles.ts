import { MediaFile, User } from "@prisma/client";

export interface MyTweetType {
    id: string,
    text: string,
    createdAt: Date,
    updatedAt: Date,
    author: User,
    authorId: string,
    replyToId?: string,
    replyTo?: MyTweetType,
    replies: MyTweetType[],
    MediaFiles: MediaFile[]
};
export const mediaFileTransformer = (mediaFile: MediaFile) => {
    return {
        id: mediaFile.id,
        url: mediaFile.url
    }
}