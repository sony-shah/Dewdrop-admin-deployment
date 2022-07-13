import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { auth } from '../../../firebaseConfig'
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, ref, push,addDoc, setDoc, doc, docs, getDocs, arrayUnion,getDoc,updateDoc } from "firebase/firestore";
import { getFirestore ,onSnapshot} from "firebase/firestore";
import Router from 'next/router';
const authlog = getAuth();
const db = getFirestore();

import officeimg from "../../../public/images/office.png";
import loginbg from '../../../public/images/bg.png';
import ujblogoimg from "../../../public/images/ujblogo.png";
// import backgroundimg from "../../public/images/bg.png";

const LoginAdmin = () => {

    const [loginsuccess,setloginsuccess]=useState(true)
    const [loginStatus, setLoginStatus] = useState(true);

    const [successful,setsuccessful]=useState(false);
    const [currentuser, setcurrentuser] = useState('');
    const [date, setdate] = useState();
    const [currentdate, setCurrentdate] = useState('');
    const [currenttime, setCurrentTime] = useState('');
    const usersCollectionRef = collection(db, "AdminLoginTask");
    let dt = new Date();
    let tm = new Date().toLocaleTimeString();


    const handleMicrosoftLogin = async () => {
        const isLogin = localStorage.getItem("AdminData");
        const adminDetails = JSON.parse(isLogin);
        console.log(adminDetails);
     
        const microsoftProvider = new OAuthProvider('microsoft.com');

        signInWithPopup(auth, microsoftProvider).then((res) => {
            let dt = new Date().toLocaleDateString();
            let tm = new Date().toLocaleTimeString();
            setcurrentuser(res.user.displayName);

                const data = {
                    currentuser: res.user.displayName,
                    currentTime: tm,
                    Date: dt,
                } 
             
                console.log("response",res );
                console.log(data);
               
                  //localhost
                    const adminDetails = JSON.parse(isLogin);
                    localStorage.setItem('AdminData', JSON.stringify(data));
                        Router.push("/content/addcontent");
                        console.log(adminDetails);


            }).catch((err) => {
                console.log(err);
            })      
    
    }

   
    useEffect(() => {
        //get all document from firebase
        const userlogin = localStorage.getItem("AdminData");
        
        const getAllData = async () => {

            console.log("test",userlogin);
            if(userlogin != null){
                setLoginStatus(false);
                // alert("check if you have already logged in!")
                Router.push('/content/addcontent');
            }
            else{
                setLoginStatus(true);   
            }

            
        }
        getAllData();
    }, [])

     
    
    return (

        <section className="c-login">

            <div className='loginBG'>
            <Image src={loginbg}  alt='applogo'  layout='fill' />
                </div>
        <div className="signin-box">
        <Image src={ujblogoimg} width={120} height={120} alt="logo" />
            
            {loginsuccess ?    <div>

                    <h1>Welcome</h1>
                    <button
                        onClick={() => handleMicrosoftLogin()}    >
                        <Image src={officeimg} width={30} height={30} alt="images" />
                        <p>Get In</p>
                    </button>
                </div>:null }{successful ? <p>you have successfully login</p>: null}
                
                
            
        </div>
        </section>
    )
}

export default LoginAdmin
