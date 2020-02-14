
class Transform{

  fbDbToArray(fbData){
    return Object.keys(fbData).map(key=>{
      fbData[key].id = key;
      return fbData[key];
    });
  }
}

export const transform = new Transform();