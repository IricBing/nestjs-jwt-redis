import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class AuthUtil {
  private readonly algorithm = 'aes-256-ctr';
  private readonly encryptionKey = Buffer.from(
    'MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwNTU=',
    'base64',
  );
  private readonly ivLength = 16;

  /**
   * 生成token加密
   * @param key 用户uuid_终端类型
   * @param random 随机信息，用于认证
   * @returns token信息
   */
  encrypt(key: string, random: string): string {
    const iv = randomBytes(this.ivLength);
    // ? 为什么这里不能直接使用Buffer类型
    const cipher = createCipheriv(
      this.algorithm,
      Buffer.from(this.encryptionKey as any, 'base64'),
      iv,
    );
    let encrypted = cipher.update(JSON.stringify([key, random]));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('base64') + ':' + encrypted.toString('base64');
  }

  /**
   * token解密
   * @param token token信息
   * @returns 解密信息，[用户uuid_终端类型,random]
   */
  decrypt(token: string): [string, string] {
    const tokenParts = token.split(':');
    const iv = Buffer.from(tokenParts.shift(), 'base64');
    const encryptedText = Buffer.from(tokenParts.join(':'), 'base64');
    const decipher = createDecipheriv(
      this.algorithm,
      Buffer.from(this.encryptionKey as any, 'base64'),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return JSON.parse(decrypted.toString());
  }
}
