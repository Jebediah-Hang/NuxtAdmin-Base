import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { lookup } from 'mime-types';

type MediaType = 'image';

const { mediaConfig } = useRuntimeConfig();

const mediaDir: Record<MediaType, string> = {
  image: mediaConfig.imageDir
};

export default defineEventHandler((event) => {
  try {
    const { type, name } : { type: MediaType; name: string; } = getQuery(event);

    const filePath = resolve(mediaDir[type], name);
    const fileBuffer = readFileSync(filePath);

    const etag = `W/"${createHash('md5').update(fileBuffer).digest('hex')}"`;
    setHeader(event, 'ETag', etag);

    const mimeType = lookup(filePath) || undefined;
    setHeader(event, 'Content-Type', mimeType);

    const ifNoneMatch = getHeader(event, 'If-None-Match');

    if (ifNoneMatch === etag) {
      setResponseStatus(event, 304);
      return null;
    } else {
      return fileBuffer;
    }
  } catch (error) {
    setResponseStatus(event, 404);
    return null;
  }
});
