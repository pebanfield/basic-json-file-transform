const fs = require('fs').promises;
const path = require('path');

const changesPath = path.join(__dirname + '/changes.json');
const inputPath = path.join(__dirname + '/mixtape-data.json');
const outputPath = path.join(__dirname + '/output.json');

read(changesPath).then(changes => {
  let changesJSON = JSON.parse(changes);
  read(inputPath).then(updateData => {
    let updateJSON = JSON.parse(updateData);
    updateJSON.playlists = updatePlaylists(changesJSON.playlists, updateJSON.playlists);
    write(outputPath, updateJSON);
  });
});

function updatePlaylists(changes, playlists){
  if(changes.add){
    changes.add.forEach(element => {
      playlists.push(element)
    });
  }
  if(changes.remove){
    changes.remove.forEach(id => {
      playlists = playlists.filter(p => p.id !== id);
    });
  }
  if(changes.updates){
    changes.updates.forEach(update => {
      for(let i=0; i<playlists.length; i++){
        let playlist = playlists[i]
        if(playlist.id == update.playlistId){
          //assumes a song can repeat, keeping it simple
          playlist.song_ids.push(update.addSong);
        }
      }
    });
  }
  return playlists;
}

async function read(path) {
  console.log("Reading " + path);
  const data = await fs.readFile(path, "binary");
  return new Buffer.from(data);
}

async function write(path, data){
  await fs.writeFile(path, JSON.stringify(data, null, 4));
  console.log(path + " written successfully.");
}



