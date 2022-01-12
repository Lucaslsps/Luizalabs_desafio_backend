import fs from 'fs';
import eventStream from 'event-stream';

async function ReadLogFileService(): Promise<any> {
  fs.createReadStream('src/logs/games.log')
    .pipe(eventStream.split())
    .pipe(
      eventStream.mapSync((line) => {
        console.log(line);
      })
    );
}

export default ReadLogFileService;
