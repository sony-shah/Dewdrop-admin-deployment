import React, { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'
import FileBase64 from 'react-file-base64';
import Image from 'next/image';
import { auth } from '../../../firebaseConfig'
import firebaseApp from '../../../firebaseConfig';
import { signInWithPopup, OAuthProvider, getAuth, signOut } from 'firebase/auth';
import { collection, push, addDoc, setDoc, doc, docs, getDocs, arrayUnion, getDoc, updateDoc, Timestamp, orderBy } from "firebase/firestore";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Router from 'next/router';
const authlog = getAuth();
const db = getFirestore();
const storage = getStorage();


// icon
import { MdUpload } from 'react-icons/md'



const AddUser = () => {

    //for add 
    const [progress, setProgress] = useState(0);
    const [PartnerType, setPartnerType] = useState('');
    const [partnerName, setpartnerName] = useState('');
    const [businessDetail, setbusinessDetail] = useState('');
    const [businessCategory, setbusinessCategory] = useState('');

    // upload business logo
    const [businessLogourls, setbusinessLogourls] = useState('');
    const [businessLogoName, setbusinessLogoName] = useState('');
    const [businessLogoImages, setbusinessLogoImages] = useState('');


    const [businessName, setbusinessName] = useState('');
    const [videoUrl, setvideoUrl] = useState('');
    const [services, setServices] = useState([]);
    const [products, setproducts] = useState([]);

    // uplaod gallary images
    const [gallaryUrls, setgallaryUrls] = useState("");
    const [gallaryimgName, setgallaryimgName] = useState("");
    const [gallaryImages, setgallaryImages] = useState("");

    // LP's Client Logo images
    const [clientLogoUrls, setclientLogoUrls] = useState('');
    const [clientLogoName, setclientLogoName] = useState('');
    const [clientLogoImages, setclientLogoImages] = useState('');

    // lp profile logo images
    const [lpProfileUrls, setlpProfileUrls] = useState('');
    const [lpProfileimgName, setlpProfileimgName] = useState('');
    const [lpProfileImage, setlpProfileImage] = useState('');

      // lp services images
      const [servicesUrls, setServicesUrls] = useState('');
      const [serviceImgName, setserviceImgName] = useState('');
      const [serviceImage, setserviceImage] = useState('');

    // lp Product images
    const [ProductsUrls, setProductsUrls] = useState('');
    const [ProductImgName, setProductImgName] = useState('');
    const [ProductImage, setProductImage] = useState('');

    const [contDiscription, setcontDiscription] = useState('');
    const [lpUsp, setlpUsp] = useState('');
 
    // file uploading
       const [businessimgloading, setBusinessimgloading] = useState(false);
       const [gallaryimgloading, setGallaryimgloading] = useState(false);
       const [clientimgloading, setClientimgloading] = useState(false);
       const [profileimgloading, setProfileimgloading] = useState(false);
       const [servicesimgloading, setServicesimgloading] = useState(false);
       const [productimgloading, setProductimgloading] = useState(false);


    const [inputFile, setinputFile] = useState('');
    const [fileName, setfileName] = useState("No file choosen");
    const [inputTag, setInputTag] = useState('');
    const [BusinessCategory, setBusinessCategory] = useState(""); 
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    const [switchValue, setswitchValue] = useState(false);
    const [UsersData, setUsersData] = useState([]);
    const [productData, setProductData] = useState(false);
    const [serviceData, setServiceData] = useState(false);

    const usersCollectionRef = collection(db, "UserDetails");

    // select partner type
    const handlePartnerType = async (e) => {
        const target = e.target;
        if (target.checked) {
            setPartnerType(target.value);
            console.log(e.target.value);
        }
    }


    //  upload business logo 
    const handleBusinesslogo = (e) => {
        // console.log(e.target.files[0]);
        setBusinessimgloading(false);
        const file = e.target.files[0];
        const businessLogoName = e.target.files[0].name;
        setbusinessLogoName(businessLogoName);
        console.log("businesslogo", businessLogoName);

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            console.log(newImage);
            newImage["id"] = Math.random();
            //  setImages( [...images, newImage]);

            setbusinessLogoImages((businessLogoImages) => [...businessLogoImages, newImage]);
        }
    }

    const handleBusinesslogoUpload = (e) => {
        const promises = [];
        setbusinessLogourls("");
        setBusinessimgloading(true);
        businessLogoImages.map((image) => {
            // const storageRef = ref(storage, 'images/rivers.jpg');
            const storageRef = ref(storage, `/${image.name}`)

            // const storageRef = ref(storage,`images/${image.name}`).put(image);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    getDownloadURL(uploadTask.snapshot.ref).then((urls) => {
                        //   setUrls((prevState) => [...prevState, urls]);
                        setbusinessLogourls((businessLogourls) => [...businessLogourls, urls]);
                        //   setUrls( [...urls, urls]);
                    });
                },
            );
            //   
        });

        Promise.all(promises)
            .then(() => {alert("businesslogo images upload successfully");
            setBusinessimgloading(false)})
            .catch((err) => console.log(err));


    }

    // uplaod gallary images
    const handlegallaryPhoto = (e) => {
      setGallaryimgloading(false);
        const file = e.target.files[0];
        const gallaryimgName = e.target.files[0].name;
        setgallaryimgName(gallaryimgName);
        console.log("gallaryimg", gallaryimgName);

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            console.log(newImage);
            newImage["id"] = Math.random();
            //  setImages( [...images, newImage]);

            setgallaryImages((gallaryImages) => [...gallaryImages, newImage]);
        }

    }
    const handlegallaryPhotoupload = (e) => {
        const promises = [];
        setgallaryUrls("");
        setGallaryimgloading(true);
        gallaryImages.map((image) => {
            // const storageRef = ref(storage, 'images/rivers.jpg');
            const storageRef = ref(storage, `/${image.name}`)

            // const storageRef = ref(storage,`images/${image.name}`).put(image);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    getDownloadURL(uploadTask.snapshot.ref).then((galurl) => {
                        //   setUrls((prevState) => [...prevState, urls]);
                        setgallaryUrls((gallaryUrls) => [...gallaryUrls, galurl]);
                        //   setUrls( [...urls, urls]);
                    });
                },
            );
            //   
        });

        Promise.all(promises)
            .then(() => {alert("gallary images upload successfully");
            setGallaryimgloading(false)})
            .catch((err) => console.log(err));


    }
    console.log("gallaryUrls",gallaryUrls);


    // upload client logo images
    const handleClientLogo = (e) => {
       
        setClientimgloading(false);
        const file = e.target.files[0];
        const clientLogoName = e.target.files[0].name;
        setclientLogoName(clientLogoName);
        console.log("clientLogo", clientLogoName);

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            console.log(newImage);
            newImage["id"] = Math.random();
            //  setImages( [...images, newImage]);

            setclientLogoImages((clientLogoImages) => [...clientLogoImages, newImage]);
        }
    }

    const handleClientLogoUpload = (e) => {
        const promises = [];
        setclientLogoUrls("");
        setClientimgloading(true);
        clientLogoImages.map((image) => {
            // const storageRef = ref(storage, 'images/rivers.jpg');
            const storageRef = ref(storage, `/${image.name}`)

            // const storageRef = ref(storage,`images/${image.name}`).put(image);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    getDownloadURL(uploadTask.snapshot.ref).then((clientUrl) => {
                        //   setUrls((prevState) => [...prevState, urls]);
                        setclientLogoUrls((clientLogoUrls) => [...clientLogoUrls, clientUrl]);
                        //   setUrls( [...urls, urls]);
                    });
                },
            );
            //   
        });

        Promise.all(promises)
            .then(() =>{alert("client images upload successfully");
            setClientimgloading(false)})
            .catch((err) => console.log(err));
    }


    // uplaod lp profile images
    const handlelpProfileimg = (e) => {
      setProfileimgloading(false);
        const file = e.target.files[0];
        const lpProfileimgName = e.target.files[0].name;
        setlpProfileimgName(lpProfileimgName);
        // console.log("clientLogo",clientLogoName);

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            console.log(newImage);
            newImage["id"] = Math.random();
            //  setImages( [...images, newImage]);

            setlpProfileImage((lpProfileImage) => [...lpProfileImage, newImage]);
        }

    }
    // uplaod lp profile images
    const handleProfileImgupload = (e) => {
        const promises = [];
       setlpProfileUrls("")
       setProfileimgloading(true)
        lpProfileImage.map((image) => {
            // const storageRef = ref(storage, 'images/rivers.jpg');
            const storageRef = ref(storage, `/${image.name}`)

            // const storageRef = ref(storage,`images/${image.name}`).put(image);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    getDownloadURL(uploadTask.snapshot.ref).then((lpimgurl) => {
                        //   setUrls((prevState) => [...prevState, urls]);
                        setlpProfileUrls((lpProfileUrls) => [...lpProfileUrls, lpimgurl]);
                        //   setUrls( [...urls, urls]);
                    });
                },
            );
            //   
        });

        Promise.all(promises)
            .then(() => {alert("profile images upload successfully");
            setProfileimgloading(false)})
            .catch((err) => console.log(err));
    }
   


    // upload lp service images
    const HandleServiceImg = (e) => {
      setServicesimgloading(false);
        const file = e.target.files[0];
        const serviceImgName = e.target.files[0].name;
        setserviceImgName(serviceImgName);
        // console.log("clientLogo",clientLogoName);

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            console.log(newImage);
            newImage["id"] = Math.random();
            //  setImages( [...images, newImage]);

            setserviceImage((serviceImage) => [...serviceImage, newImage]);
        }

    }

    const handleServiceImgUpload=(e)=>{
        const promises = [];
       setServicesUrls("");
       setServicesimgloading(true);
        serviceImage.map((image) => {
            // const storageRef = ref(storage, 'images/rivers.jpg');
            const storageRef = ref(storage, `/${image.name}`)

            // const storageRef = ref(storage,`images/${image.name}`).put(image);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    getDownloadURL(uploadTask.snapshot.ref).then((serviceUrls) => {
                        //   setUrls((prevState) => [...prevState, urls]);
                        setServicesUrls((servicesUrls) => [...servicesUrls, serviceUrls]);
                        //   setUrls( [...urls, urls]);
                    });
                },
            );
            //   
        });

        Promise.all(promises)
            .then(() => {alert("service images upload successfully");
            setServicesimgloading(false)})
            .catch((err) => console.log(err));
   
    }

    // uplaod lp product images
    const HandleProductImage = (e) => {
      setProductimgloading(false);
        const file = e.target.files[0];
        const ProductImgName = e.target.files[0].name;
        setProductImgName(ProductImgName);
        // console.log("clientLogo",clientLogoName);

        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            console.log(newImage);
            newImage["id"] = Math.random();
            //  setImages( [...images, newImage]);

            setProductImage((ProductImage) => [...ProductImage, newImage]);
        }

    }
    const HandleProductImgUpload=(e)=>{
        const promises = [];
        setProductsUrls("");
        setProductimgloading(true);
        ProductImage.map((image) => {
            // const storageRef = ref(storage, 'images/rivers.jpg');
            const storageRef = ref(storage, `/${image.name}`)

            // const storageRef = ref(storage,`images/${image.name}`).put(image);
            const uploadTask = uploadBytesResumable(storageRef, image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    //   console.log('File available at', downloadURL);
                    getDownloadURL(uploadTask.snapshot.ref).then((productUrls) => {
                        //   setUrls((prevState) => [...prevState, urls]);
                        setProductsUrls((ProductsUrls) => [...ProductsUrls, productUrls]);
                        //   setUrls( [...urls, urls]);
                    });
                },
            );
            //   
        });

        Promise.all(promises)
            .then(() => {alert("products images upload successfully");
            setProductimgloading(false)})
            .catch((err) => console.log(err));
   
    }

    // product add and remove
    const handleProductChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...products];
        list[index][name] = value;
        setproducts(list);
    };
    // handle click event of the Remove product
    const handleRemoveProduct = index => {
        const list = [...products];
        list.splice(index, 1);
        setproducts(list);
    };

    // handle click event of the Add product
    const handleAddProduct = () => {
        setproducts([...products, { productsName: "", productsDisc: "", productsImg: "" }]);
        console.log(products);
        setProductData(true);
    };

    // handle input change  //service and remove
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...services];
        list[index][name] = value;
        setServices(list);
    };

    // handle click event of the Remove service
    const handleRemoveService = index => {
        const list = [...services];
        list.splice(index, 1);
        setServices(list);
    };

    // handle click event of the Add service
    const handleAddService = () => {
        setServices([...services, { serviceName: "", serviceDisc: "", serviceImg: "" }]);
        console.log(services);
        setServiceData(true);
        
    };

    // get businesscategory data function
    const GetBusinessCategory = (e) => {
        const target = event.target.value;
        setBusinessCategory(target);
        console.log(BusinessCategory);
    }


    useEffect(() => {
        const getContent = async () => {
            const data = await getDocs(collection(db, "BusinessCategory"));
            setUsersData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            console.log("UserAllData:", data);
        };
        getContent();
    }, []);


    // Add user function
    const handleAddUser = async (e) => {
        const isLogin = localStorage.getItem("AdminData");
        const adminDetails = JSON.parse(isLogin);
        console.log(adminDetails);
        const AdminName = adminDetails.currentuser;

        const data = {
            AdminName: AdminName,
            PartnerType: PartnerType,
            partnerName: partnerName,
            businessLogo: businessLogourls,
            gallary: gallaryUrls,
            clientLogo: clientLogoUrls,
            BusinessCategory: BusinessCategory,
            lpUsp:lpUsp,
            lpProfileimg: lpProfileUrls,
            servicesImgUrl:servicesUrls,
            productsImgUrl:ProductsUrls,
            products: products,
            services: services,
            businessName: businessName,
            businessDetail: businessDetail,
            videoUrl: videoUrl,
            productData:productData,
            serviceData:serviceData,
            userCreatedby: Timestamp.now(),
        }

        

        const newCityRef = doc(collection(db, "UsersData"));
        await setDoc(newCityRef, data);
        console.log(data);
        alert("User Created Successfully!");
        // Router.push("/users/userlist");


        setPartnerType("");
        setpartnerName("");
        setbusinessLogoImages("");
        setbusinessLogoName("");
        setbusinessLogourls("");
        setgallaryImages("");
        setgallaryimgName("");
        setgallaryUrls("");
        setclientLogoImages("");
        setclientLogoName("");
        setclientLogoUrls("");
        setbusinessCategory("");
        setlpUsp("");
        setlpProfileImage("");
        setlpProfileimgName("");
        setlpProfileUrls("");
        setserviceImage("");
        setserviceImgName("");
        setServicesUrls("");
        setProductImage("");
        setProductImgName("");
        setProductsUrls("");
        setServices("");
        setproducts("");
        setbusinessName("");
        setbusinessDetail("");
        setvideoUrl("");


    }



    return (
        <>
            <section className='c-form  box'>
                <h1>Add user</h1>
        
            <ul>

                {/*  choose Partner type */}
                <li className='form-row'>
                    <h4>Partner Type</h4>
                    <div className='multipleitem'>
                        <div>
                            <label htmlFor='partner'>
                                <input
                                    id="partner"
                                    value="Partner"
                                    name="handlePartnerType"
                                    type="radio"
                                   
                                    checked={PartnerType == 'Partner'}
                                    onChange={handlePartnerType} />
                                <div className='custom_radio'></div>
                                Partner
                            </label>
                        </div>
                        <div>
                            <label htmlFor='listedpartner'>
                                <input
                                    id="listedpartner"
                                    value="ListedPartner"
                                    name="handlePartnerType"
                                    type="radio"
                                    checked={PartnerType == 'ListedPartner'}
                                    onChange={handlePartnerType} >
                                </input>
                                <div className='custom_radio'></div>

                                Listed Partner

                            </label>
                        </div>
                    </div>

                </li>

                {/* Partner Name */}
                <li className='form-row'>
                    <h4>partner Name</h4>
                    <div className='multipleitem'>
                        <input type="text"
                            placeholder='Enter partner name'
                            name="partnerName"
                            
                            value={partnerName}
                            onChange={(event) => { setpartnerName(event.target.value) }}
                             >
                        </input>

                        {/* <span class="valid-feedback">Looks good!</span> */}


                    </div>
                </li>


                 {/* our usp */}
                 <li className='form-row'>
                         <h4>Our USP</h4>
                     <div className='multipleitem'>
                        <textarea
                            type="text"
                            placeholder='Enter USP'
                            name="uspdata"
                        
                            value={lpUsp}
                            onChange={( event ) => {setlpUsp(event.target.value)}}
                             >
                            </textarea>
                     </div>
                 </li>
               

                {/* upload Business logo  */}
                <li className='form-row'>
                    <h4>Business Logo</h4>
                    <div className='multipleitem uploadimagebtn'>

                        <input id="businesslogo"
                            type="file"
                            name="businesslogoimg"
                            multiple
                            onChange={handleBusinesslogo} />

                        <label htmlFor='businesslogo' className='custom-file-upload'>{businessimgloading ?" Loading ..." : " Upload File "} </label>
                        <span id="businesslogo" className='filename'>{businessLogoName}</span>
                        <span onClick={handleBusinesslogoUpload} className='uplaod-icon'><MdUpload /></span>

                        <span className='badgesimages'> {businessLogourls && businessLogourls.map((businessUrl, i) => (
                        <img
                            key={i}
                            style={{ width: "100px" }}
                            src={businessUrl || "http://via.placeholder.com/300"}
                            alt="firebase-image"
                        />
                    ))}</span>
                    </div>



                    
                </li>

                {/* upload Gallary images  */}
                <li className='form-row'>
                    <h4>Gallary photos</h4>
                    <div className='multipleitem'>

                        <input id="gallaryimg" type="file"
                            name="gallaryImages"
                            multiple
                            
                            onChange={handlegallaryPhoto} />

                        <label htmlFor='gallaryimg' className='custom-file-upload'> {gallaryimgloading ?" Loading ..." : " Upload File "}</label>
                        <span id="gallaryimg" className='filename'>{gallaryimgName}</span>
                        <span onClick={handlegallaryPhotoupload} className='uplaod-icon'><MdUpload /></span>

                        <span> {gallaryUrls && gallaryUrls.map((gallaryurl, i) => (
                        <img
                            key={i}
                            style={{ width: "100px" }}
                            src={gallaryurl || "http://via.placeholder.com/300"}
                            alt="firebase-image"
                        />
                    ))}</span>

                    </div>
                
                </li>


                {/* upload lp client logo  */}
                <li className='form-row'>
                    <h4>Client Logo</h4>
                    <div className='multipleitem'>

                        <input id="clientimg" type="file"
                            name="ClientLogo"
                            multiple
                            onChange={handleClientLogo}
                        />

                        <label htmlFor='clientimg' className='custom-file-upload'> {clientimgloading ?" Loading ..." : " Upload File "}</label>
                        <span id="clientimg" className='filename'>{clientLogoName}</span>
                        <span onClick={handleClientLogoUpload} className='uplaod-icon'><MdUpload /></span>
                        
                        <span> {clientLogoUrls && clientLogoUrls.map((clienturl, i) => (
                            <img
                                key={i}
                                style={{ width: "100px" }}
                                src={clienturl || "http://via.placeholder.com/300"}
                                alt="firebase-image"
                            />
                            // <ul> <li> <a href={clientLogoUrls}>{clientLogoUrls}</a></li> </ul>
                        ))}</span>
                    </div>

                </li>


                {/* upload  profile picture   */}
                <li className='form-row'>
                    <h4>Partner Profile</h4>
                    <div className='multipleitem'>

                        <input id="profileimg"
                            type="file"
                            // name="profileLogo"
                            onChange={handlelpProfileimg}
                        />

                        <label htmlFor='profileimg' className='custom-file-upload'>{profileimgloading ?" Loading ..." : " Upload File "}</label>
                        <span id="profileimg" className='filename'>{lpProfileimgName}</span>
                        <span onClick={handleProfileImgupload} className='uplaod-icon'><MdUpload /></span>
                        <span> {lpProfileUrls && lpProfileUrls.map((profileUrls, i) => (
                                <img
                                    key={i}
                                    style={{ width: "100px" }}
                                    src={profileUrls || "http://via.placeholder.com/300"}
                                    alt="firebase-image"
                                />
                    ))}</span>


                    </div>
                    
                </li>

                {/* add services images for service */} 
                <li className='form-row'>
                    <h4>Service Images</h4>
                    <div className='multipleitem'>

                        <input id="LpServiceImg" type="file"
                            name="servicesdetails"
                            multiple
                            onChange={HandleServiceImg}
                        />

                        <label htmlFor='LpServiceImg' className='custom-file-upload'>{servicesimgloading ?" Loading ..." : " Upload File "}  </label>
                        <span id="LpServiceImg" className='filename'>{serviceImgName}</span>
                        <span onClick={handleServiceImgUpload} className='uplaod-icon'><MdUpload /></span>
                        
                        <span> {servicesUrls && servicesUrls.map((servicesurl, i) => (
                            // console.log(productUrls),
                        <ul> <li> <a href={servicesurl}>{servicesurl}</a></li> </ul> 
                            // <img
                            //     key={i}
                            //     style={{ width: "100px" }}
                            //     src={productUrls || "http://via.placeholder.com/300"}
                            //     alt="firebase-image"
                            // />
                            
                        ))}</span>
                    </div>

                    {/* <div> {servicesUrls && servicesUrls.map((servicesurl, i) => (
                        <img
                            key={i}
                            style={{ width: "100px" }}
                            src={servicesurl || "http://via.placeholder.com/300"}
                            alt="firebase-image"
                        />
                    ))}</div> */}
                </li>


                {/* add product images for product */}
                <li className='form-row'>
                    <h4>Product Images</h4>
                    <div className='multipleitem'>

                        <input id="productImagesid" type="file"
                            name="productdetails"
                            multiple
                            onChange={HandleProductImage}
                        />

                        <label htmlFor='productImagesid' className='custom-file-upload'>{productimgloading ?" Loading ..." : " Upload File "} </label>
                        <span id="productImagesid" className='filename'>{ProductImgName}</span>
                        <span onClick={HandleProductImgUpload} className='uplaod-icon'><MdUpload /></span>
                        
                        <span>{ProductsUrls && ProductsUrls.map((productUrls, i) => (
                        // console.log(productUrls),
                    <ul> <li> <a href={productUrls}>{productUrls}</a></li> </ul> 
                        // <img
                        //     key={i}
                        //     style={{ width: "100px" }}
                        //     src={productUrls || "http://via.placeholder.com/300"}
                        //     alt="firebase-image"
                        // />
                        
                    ))}</span>
                    </div>

                
                </li>

                {/* Lp business services */}
                <li className='form-row'>
                    <h4 >Add Services</h4>
                    <div className='multipleitem multirow'>
                        {services && services.map((x, i) =>
                            <>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='Service Name'
                                        name="serviceName"
                                        value={x.serviceName}
                                        onChange={e => handleInputChange(e, i)}
                                         />


                                    <textarea
                                        type="text"
                                        placeholder='Service Discription'
                                        name="serviceDisc"
                                        value={x.serviceDisc}
                                        onChange={e => handleInputChange(e, i)}
                                         />

                                    <input
                                        type="text"
                                        placeholder='Service Image Url'
                                        name="serviceImg"
                                        value={x.serviceImg}
                                        onChange={e => handleInputChange(e, i)}
                                         />


                                    {/* <div className="serviceimgupload">
                                        <input id="serviceimg" type="file"
                                            name="serviceImg"
                                            value={x.serviceImg}
                                            onChange={e => handleInputChange(e, i)} />
                                        <label htmlFor="serviceimg" className='custom-file-upload'>File upload</label>
                                        <span id="serviceimg">{fileName}</span>
                                    </div> */}


                                    {/* {services.length !== 1 && <button className="removebtn" onClick={() => handleRemoveService(i)}><AiOutlineDelete /></button>} */}
                                    <button className="removebtn" onClick={() => handleRemoveService(i)}><AiOutlineDelete /></button>

                                </div>

                                {/* {services.length - 1 === i &&  */}
                                {/* <div className="btn-box"><button className='addbtn' onClick={handleAddService}>Add</button></div> */}
                                {/* } */}



                            </>


                        )}
                                <div className="btn-box"><button className='addbtn' onClick={handleAddService}>Add</button></div>






                    </div>
                </li>


                {/* Lp business product */}
                <li className='form-row'>
                    <h4 >Add Products</h4>
                    <div className='multipleitem  multirow'>
                        {products && products.map((x, i) =>
                            <>
                                <div >
                                    <input
                                        type="text"
                                        placeholder='products Name'
                                        name="productsName"
                                        value={x.productsName}
                                        onChange={e => handleProductChange(e, i)}
                                         />


                                    <textarea
                                        type="text"
                                        placeholder='products Discription'
                                        name="productsDisc"
                                        value={x.productsDisc}
                                        onChange={e => handleProductChange(e, i)}
                                         />

                                    <input
                                        type="text"
                                        placeholder='products Image Url'
                                        name="productsImg"
                                        value={x.productsImg}
                                        onChange={e => handleProductChange(e, i)}
                                         />

                                    {/* <div className="productimgupload">
                                        <input id="productsimg" type="file"
                                            name="productsImg"
                                            value={x.productsImg}
                                            onChange={e => handleProductChange(e, i)} />
                                        <label htmlFor='productsimg' className='custom-file-upload'>File upload</label>
                                        <span id="productsimg">{fileName}</span>
                                    </div> */}


                                    {/* {products.length !== 1 && <button className="removebtn" onClick={() => handleRemoveProduct(i)}><AiOutlineDelete /></button>} */}
                                    <button className="removebtn" onClick={() => handleRemoveProduct(i)}><AiOutlineDelete /></button>

                                </div>

                                {/* {products.length - 1 === i && <div className="btn-box"><button className='addbtn' onClick={handleAddProduct}>Add</button></div>} */}



                            </>


                        )}

                        <div className="btn-box"><button className='addbtn' onClick={handleAddProduct}>Add</button></div>





                    </div>
                </li>

               
                {/* select Business category input */}
                <li className='form-row'>
                    <h4>Business Category</h4>
                    <div className='multipleitem'>

                        <select onChange={GetBusinessCategory}>
                            <option selected>Select Business Category</option>
                            {
                                UsersData && UsersData.map(businessData => {
                                    //console.log(formUser);
                                    return (

                                        <option value={businessData.businessCategory} onClick={(e) => GetBusinessCategory(businessData)}>{businessData.businessCategory}</option>

                                    )
                                })
                            }
                        </select>

                    </div>
                </li>

                {/* Business Name */}
                <li className='form-row'>
                    <h4 htmlFor="validationCustom02">Business Name</h4>
                    <div className='multipleitem'>
                        <input type="text"
                            placeholder='Business Name '
                            name="businessname"
                            id="validationCustom02"
                            value={businessName}
                            onChange={(event) => { setbusinessName(event.target.value) }}
                             >
                        </input>

                        {/* <span class="valid-feedback">Looks good!</span> */}


                    </div>
                </li>
                

                {/* Enter Lp Business details  */}
                <li className='form-row'>
                    <h4 htmlFor="validationCustom03">Business Details</h4>
                    <div className='multipleitem'>
                        <textarea type="text"
                            placeholder='Listed Partner Business details'
                            name="businessdetails"
                            id="validationCustom03"
                            value={businessDetail}
                            onChange={(event) => { setbusinessDetail(event.target.value) }}
                             >
                        </textarea>

                        {/* <span class="valid-feedback">Looks good!</span> */}


                    </div>
                </li>

                {/* Youtube Video Url */}
                <li className='form-row'>
                    <h4 htmlFor="validationCustom04">Video Url</h4>
                    <div className='multipleitem'>
                        <input type="text"
                            placeholder='Link Video Url'
                            name="videoUrl"
                            id="validationCustom04"
                            value={videoUrl}
                            onChange={(event) => { setvideoUrl(event.target.value) }}
                             >
                        </input>

                        {/* <span class="valid-feedback">Looks good!</span> */}


                    </div>
                </li>


                {/* user content discription
                <li className='form-row'>
                    <h4>Business Discription</h4>
                    <div className='multipleitem'>

                        <textarea type="text"
                            value={contDiscription}
                            name="contentDiscription"
                            placeholder='Content Discription'
                            onChange={(event=>{setcontDiscription(event.target.value)})}
                            required />
                    </div>
                </li> */}

                {/* submit & reset button  */}
                <li className='form-row'>
                    <div>
                        <button className='submitbtn' onClick={handleAddUser}>Submit</button>
                        <button className='resetbtn'>Reset</button>
                    </div>
                </li>


            </ul>
     
               
            </section>

        </>
    )
}

export default AddUser




