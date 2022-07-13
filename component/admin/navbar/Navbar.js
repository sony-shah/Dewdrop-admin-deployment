import React from 'react'
import { AiOutlineHome } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";

import { MdOutlineContentPaste } from "react-icons/md";
import { RiListSettingsLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { RiSurveyLine } from "react-icons/ri";



import Link from 'next/link'
import { useRouter } from "next/router";

const Navbar = (props) => {
    console.log("nav props",props.expand);
    

    const router = useRouter();


    return (
        <>
            <nav className={props.expand ? 'm-navbar expand' : 'm-navbar unexpand' }>
        
                <ul>
                    <li>
                        <Link href="/admin/dashboard">
                            <a>
                                <span className="icons"><AiOutlineHome /></span>
                                <span className="linklabel">Dashboard</span> 
                            </a>
                        </Link>
                    </li>

                    <li>
                                               
                     <Link href="/">
                            <a>
                                <span className="icons"><MdEventAvailable /></span>
                                <span className="linklabel">Event</span>
                                <span className='submenuIcon'><MdOutlineKeyboardArrowDown/></span>
                            </a>

                        </Link>  
                       
                            <ul>
                                <Link href="/event/addevent">
                                    <li>
                                        <a> Add Event</a>                                   
                                    </li>
                                </Link>
                           
                                <Link href="/event/addevent">
                                    <li>         
                                            <a>Event Listing</a>
                                    
                                    </li>
                                </Link>

                            </ul>
      
                    </li>

                    {/* for content */}

                    <li>
                        <Link href="/">
                            <a>
                                <span className="icons"><MdOutlineContentPaste /></span>
                                <span className="linklabel">Content</span>
                                <span className='submenuIcon'><MdOutlineKeyboardArrowDown/></span>
                             </a>
                         
                        </Link>
                            <ul>
                                <Link href="/content/addcontent"> 
                                        <li>
                                            <a>Add Content</a>
                                        </li>
                                </Link>
                               
                                <Link href="/content/contentlist">
                                    <li>
                                       <a> Content Listing</a>
                                    </li>
                                </Link>
                                
                            

                            </ul>

                    </li>


            {/* for users */}
                    <li>
                        <Link href="/">
                            <a>
                                <span className="icons"><FaRegUser /></span>
                                <span className="linklabel">Users</span>
                                <span className='submenuIcon'><MdOutlineKeyboardArrowDown/></span>
                             </a>
                         
                        </Link>
                            <ul>
                                <Link href="/users/adduser">
                                    <li>   
                                            <a>Add User</a>
                                    
                                    </li>
                                </Link>

                                <Link href="/users/userlist">

                                    <li>
                                
                                            <a>User Listing</a>                               
                                    
                                    </li>
                                </Link>
                                 <Link href="/users/businesscategory">

                                    <li>
                                
                                            <a>Business Category</a>                               
                                    
                                    </li>
                                </Link>
                            
                            

                            </ul>

                    </li>

            {/* Enquiry */}
                    <li>
                        <Link href="/admin/enquiry">
                            <a>
                                <span className="icons"><RiSurveyLine /></span>
                                <span className="linklabel">Enquiry</span> 
                            </a>
                        </Link>
                    </li>

                    {/* setting */}

                    <li>
                        <Link href="/admin/setting">
                            <a>
                                <span className="icons"><RiListSettingsLine /></span>
                                <span className="linklabel">Setting</span> </a>
                        </Link>
                    </li>



                </ul>
            </nav>
        </>
    )
}

export default Navbar
