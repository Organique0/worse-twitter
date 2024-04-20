import client from ".";
import { MediaFileData } from "../api/user/tweets/index.post";

export const createMediaFile = (mediaFile: MediaFileData) => {
    return client.mediaFile.create({
        data: mediaFile
    });
}