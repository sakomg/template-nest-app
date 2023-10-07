import { Injectable } from '@nestjs/common';
import { Client, SFTPWrapper } from 'ssh2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SftpService {
  private readonly client: Client;

  constructor(private readonly config: ConfigService) {
    this.client = new Client();
  }

  async doConnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        console.log('✅ success connection to sftp server');
        resolve();
      });

      this.client.on('error', (err: Error) => {
        console.error('❌ sftp connection error:', err);
        reject(err);
      });

      this.client.connect({
        port: 22,
        host: this.config.get('SFTP_HOST'),
        username: this.config.get('SFTP_USERNAME'),
        password: this.config.get('SFTP_PASSWORD'),
      });
    });
  }

  async listFiles(directoryPath: string, fileExtension: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.client.sftp((err: any, sftp: SFTPWrapper) => {
        if (err) {
          console.error('❌ sftp error:', err);
          reject(err);
        }

        sftp.readdir(directoryPath, (err: any, files: any) => {
          if (err) {
            console.error('❌ sftp readdir error:', err);
            reject(err);
          }

          const filteredFiles = files
            .filter((file: any) => file.filename.endsWith(fileExtension))
            .map((file: any) => file.filename);

          resolve(filteredFiles);
        });
      });
    });
  }

  retrieveDataByFileName(remoteFilePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.sftp((err: Error | undefined, sftp: SFTPWrapper) => {
        if (err) {
          console.error('❌ sftp error:', err);
          reject(err);
        }

        sftp.readFile(remoteFilePath, 'utf8', (err: Error | undefined, data: Buffer) => {
          if (err) {
            console.error('❌ sftp read error:', err);
            reject(err);
          }
          resolve(data.toString());
          sftp.end();
        });
      });
    });
  }

  disconnect(): void {
    if (this.client && !this.client._destroyed) {
      this.client.end();
      console.log('👍 disconnected from SFTP server');
    }
  }
}
