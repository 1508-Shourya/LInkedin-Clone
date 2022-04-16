
import  { auth ,provider,storage,storageRef} from '../firebase';
import db1 from "../firebase";
import { SET_USER } from './actionType';
import { signInWithPopup } from "firebase/auth";
import { getStorage,ref,uploadBytes} from "firebase/storage";
import {getDatabase,set,ref as ref1} from 'firebase/database'
export const setUser = (result) => ({
    type: SET_USER,
    user: result,
})
export function signInAPI() {
    return (dispatch) => {
 signInWithPopup(auth,provider).then((result)=>{
     dispatch(setUser(result.user));
 }).catch((e)=>{
     console.log(e);
 })

    };
}

export  function getUserAuth() {
    return (dispatch) => {

    auth.onAuthStateChanged(async(user) => {
     if(user){
         dispatch(setUser(user));
     }
 });
    };
}

export function signOutAPI() {
    return (dispatch) => {
        auth.signOut().then(() => {
            dispatch(setUser(null));
        }).catch((e) => {
            console.log(e.message);
        });

    };
}



export function postArticleAPI(result) {

    return (dispatch) => {
        if (result.image != "")
        { 
            
            
            console.log(result);
            const upload = ref(storage,`images/${result?.image?.name}`);
            uploadBytes(upload,result.image).then((s)=>{
                console.log(s);
                
              const a=  async () => {
                    const downloadURL = s.metadata.fullPath;
                    
                    const db = getDatabase();
                    
      set(ref1(db, 'articles'), {
    actor: {
        description: result.user.email,
        title: result.user.displayName, 
        // date: result.timestamp,
        image: result.user.photoURL,
    },
        video: result.video,
         sharedImg: downloadURL,
        comments: 0,
        description: result.description,
  });


                //     db.collection("articles").add({
                //         actor: {
                //             description: result.user.email,
                //             title: result.user.displayName,
                //             date: result.timestamp,
                //             image: result.user.photoURL,
                //         },
                //             video: result.video,
                //             sharedImg: downloadURL,
                //             comments: 0,
                //             description: result.description,
                        
                //     });
                }
                 a();

            });
           
            // const upload = ref(storage,`images/${result.image.name}`)
            // .put(result.image);
            // upload.on("state-changed",(snapshot) => {
            //     const progress = 
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //     console.log(`Progress: ${progress}%`);
            //     if (snapshot.state === "RUNNING") {
            //         console.log(`Progress: ${progress}%`);
            //     }
            // }, error => console.log(error.code),
            // async () => {
            //     const downloadURL = await upload.snapshot.ref.getdownloadURL();
            //     db.collection("articles").add({
            //         actor: {
            //             description: result.user.email,
            //             title: result.user.displayName,
            //             date: result.timestamp,
            //             image: result.user.photoURL,
            //         },
            //             video: result.video,
            //             sharedImg: downloadURL,
            //             comments: 0,
            //             description: result.description,
                    
            //     });
            // }
            // );
            
        }

    };
}