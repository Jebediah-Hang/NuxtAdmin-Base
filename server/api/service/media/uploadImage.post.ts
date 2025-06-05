import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { FileUploadInfo } from '@/types/models/media';

const { mediaConfig } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const formDatas = await readMultipartFormData(event);

    if (!formDatas || !formDatas.length) {
      setResponseStatus(event, 400);
      return ResultJson.failed(400, '请上传图片文件');
    }

    const file = formDatas[0];

    if (!file.type?.startsWith('image/')) {
      setResponseStatus(event, 400);
      return ResultJson.failed(400, '只能上传图片');
    }

    const extension = file.filename?.split('.').pop() || '';
    const newFilename = `${getDateTimeString()}.${extension}`;

    const uploadDir = mediaConfig.imageDir;

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const fileFullPath = resolve(uploadDir, newFilename);
    await writeFile(fileFullPath, file.data);

    const result: FileUploadInfo = {
      name: newFilename,
      url: `${mediaConfig.imagePublicPath}${newFilename}`
    };

    return ResultJson.success(result);

  } catch (error) {
    setResponseStatus(event, 500);
    return ResultJson.failed(500, (<Error>error).message);
  }
});
