import { Injectable } from '@nestjs/common';
import { Client, SFTPWrapper } from 'ssh2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SftpService {
  private readonly client: Client;

  constructor(private readonly config: ConfigService) {
    this.client = new Client();
  }

  doConnect(): Promise<void> {
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
        port: 22, // sftp default
        host: this.config.get('SFTP_HOST'),
        username: this.config.get('SFTP_USERNAME'),
        password: this.config.get('SFTP_PASSWORD'),
      });
    });
  }

  getListFiles(directoryPath: string, fileExtension: string): Promise<string[]> {
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

          let filteredFiles = files.map((file: any) => file.filename);

          if (fileExtension) {
            filteredFiles = filteredFiles.filter((filename: string) => filename.endsWith(fileExtension));
          }

          resolve(filteredFiles);
        });
      });
    });
  }

  getDataByFilename(remoteFilePath: string): Promise<string> {
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

  doDisconnect(): void {
    if (this.client && !this.client._destroyed) {
      this.client.end();
      console.log('👍 disconnected from SFTP server');
    }
  }
}
