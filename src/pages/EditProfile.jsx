import React, { useState, useEffect } from 'react'
import { Loader } from '../components/Loader'
import { MetaData } from '../components/MetaData'
import { AiOutlineMail } from 'react-icons/ai'
import { MdPermIdentity, MdOutlineFeaturedPlayList } from 'react-icons/md'
import { BsFileEarmarkText } from 'react-icons/bs'
import { updateProfile, me as ME } from '../actions/UserActions'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage } from '../actions/UserActions'



export const EditProfile = () => {

    const dispatch = useDispatch()
    const { loading, me } = useSelector(state => state.user)
    const userId = useSelector(state => state.user.me._id)

    const [firstName, setFirstName] = useState(me.firstName || '');
    const [lastName, setLastName] = useState(me.lastName || '');
    const [email, setEmail] = useState(me.email || '');
    const [description, setDescription] = useState(me.description || '');
    const [age, setAge] = useState(me.age || '');
    const [gender, setGender] = useState(me.gender || '');
    const [phoneNumber, setPhoneNumber] = useState(me.phoneNumber || '');
  

    const [avatar, setAvatar] = useState("")
    const [avatarName, setAvatarName] = useState("")

    const [resume, setResume] = useState("")
    const [resumeName, setResumeName] = useState("")






    const avatarChange = (e) => {
        if (e.target.name === "avatar") {
          const file = e.target.files[0];
          setAvatar(file);
          setAvatarName(file.name);
    
        }
      };



    const resumeChange = (e) => {
        if (e.target.name === "resume") {
          const file = e.target.files[0];
          setResume(file);
          setResumeName(file.name);
        }
    }


    const editHandler = async (e) => {
        e.preventDefault();
    
        let avatarUrl = avatar;
        if (avatar instanceof File) {
          const data1 = await dispatch(uploadImage(avatar));
          avatarUrl = data1; 
        }

        let resumeUrl = resume;
        if (resume instanceof File) {
          const data2 = await dispatch(uploadImage(resume));
          resumeUrl = data2; 
        }

        console.log(resumeUrl);
    
        const data = {
          firstName: firstName,
          lastName: lastName,
          age: age,
          email: email,
          avatar: avatarUrl,
          phoneNumber: phoneNumber,
          description: description,
          id: me._id,
          resume: resumeUrl,
        };
        console.log(me._id);
        dispatch(updateProfile(data));
      };


    // useEffect(()=>{
    //     dispatch(ME())
    //     setName(me.name)
    //     setEmail(me.email)
    //     setSkills(me.skills)
    // },[dispatch])

    return (
        <>

            <MetaData title="Edit Profile" />
            <div className='bg-gray-950 min-h-screen pt-14  md:px-20 px-3  text-white'>


                {loading ? <Loader /> :

                    <div>
                        <div className=' flex justify-center w-full items-start pt-14'>
                            <form onSubmit={editHandler} className='flex flex-col md:w-1/3 shadow-gray-700  w-full md:mx-0 mx-3 pb-28' action="">

                                <div className='md:px-10 px-7 pb-6 w-full shadow-sm shadow-gray-700 border-gray-700 border pt-5  flex flex-col gap-4'>
                                    <div className='text-center'>
                                        <p className='text-4xl  font-semibold'>Edit Profile</p>
                                    </div>


                                    {/* Name */}
                                    <div className='bg-white flex justify-center items-center gap-4'>
                                        <div className='flex items-center'>
                                            <div className='text-gray-600 px-2'>
                                                <MdPermIdentity size={20} />
                                            </div>
                                            <input
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                                placeholder='Tên'
                                                type="text"
                                                className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'
                                            />
                                        </div>
                                        <div className='border-l border-black h-full'></div> {/* Đường gạch dọc */}
                                        <div className='flex items-center'>
                                            <input
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                                placeholder='Họ'
                                                type="text"
                                                className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'
                                            />
                                        </div>
                                    </div>

                                    <div className='bg-white flex justify-center items-center gap-4'>
                                        <div className='flex items-center'>
                                            <div className='text-gray-600 px-2'>
                                                <MdPermIdentity size={20} />
                                            </div>
                                            <input
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                required
                                                placeholder='tuổi'
                                                type="text"
                                                className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'
                                            />
                                        </div>
                                        <div className='border-l border-black h-full'></div> {/* Đường gạch dọc */}
                                        <div className='flex items-center'>
                                            <input
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                required
                                                placeholder='Số điện thoại'
                                                type="text"
                                                className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'
                                            />
                                        </div>
                                    </div>

                                    {/* Gender */}
                                    <div className='bg-white flex justify-between items-center gap-4'>
                                        <div className='flex items-center'>
                                            <input
                                                type="radio"
                                                id="male"
                                                name="gender"
                                                value="true"
                                                checked={gender === true}
                                                onChange={() => setGender(true)}
                                                className='mr-2 ml-3'
                                            />
                                            <label htmlFor="male" className='text-black'>Nam</label>
                                        </div>
                                        <div className='flex items-center'>
                                            <input
                                                type="radio"
                                                id="female"
                                                name="gender"
                                                value="false"
                                                checked={gender === false}
                                                onChange={() => setGender(false)}
                                                className='mr-2'
                                            />
                                            <label htmlFor="female" className='text-black mr-24'>Nữ</label>
                                        </div>
                                    </div>


                                    {/* Mail */}
                                    <div className='bg-white flex justify-center items-center'>
                                        <div className='text-gray-600 px-2'>
                                            <AiOutlineMail size={20} />
                                        </div>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' type="email" className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
                                    </div>

                                    {/* Mail */}
                                    <div className='bg-white flex justify-center items-center'>
                                        <div className='text-gray-600 px-2'>
                                            <AiOutlineMail size={20} />
                                        </div>
                                        <input value={description} onChange={(e) => setDescription(e.target.value)} required placeholder='Mô tả' type="text" className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
                                    </div>


                                    {/* Profile */}
                                    <div>
                                        <div className='bg-white flex justify-center items-center'>
                                            <div className='text-gray-600 px-2'>
                                                <CgProfile size={20} />
                                            </div>
                                            <label htmlFor='avatar' className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2 '>
                                                {avatarName.length === 0 ? <span className='text-gray-500 font-medium'>Select New Profile Pic...</span>
                                                    : avatarName}
                                            </label>
                                            <input id='avatar' name='avatar' required
                                                onChange={avatarChange}
                                                placeholder='Profile' accept="image/*" type="file" className='outline-none  w-full hidden text-black px-1 pr-3 py-2' />


                                        </div>
                                        <p className='bg-gray-950 text-white text-xs'>Please select Image file</p>
                                    </div>


                                    {/* Resume */}
                                    <div>
                                        <div className='bg-white flex justify-center items-center'>
                                            <div className='text-gray-600 px-2'>
                                                <BsFileEarmarkText size={20} />
                                            </div>
                                            <label className='outline-none w-full text-black px-1 pr-3 py-2' htmlFor="resume">
                                                {resumeName.length === 0 ? <span className='text-gray-500 cursor-pointer font-medium'>Select New Resume...</span> : resumeName}
                                            </label>
                                            <input required
                                                onChange={resumeChange}
                                                placeholder='Resume' id='resume' name='resume' accept="image/*" type="file" className='outline-none hidden w-full text-black px-1 pr-3 py-2' />
                                        </div>
                                        <p className='bg-gray-950 text-white text-xs'>Please select Image file</p>
                                    </div>

                                    {/* <div className='bg-white flex justify-center items-center'>
                                        <div className='text-gray-600 md:pb-12 pb-8 px-2'>
                                            <MdOutlineFeaturedPlayList size={20} />
                                        </div>
                                        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder='Skills' type="text" className='outline-none w-full text-black bold-placeholder px-1 pr-3 py-2' />
                                    </div> */}


                                    <div>
                                        <button className='blueCol px-8 w-full py-2 flex justify-center items-center font-semibold' >Update</button>
                                    </div>


                                </div>



                            </form>
                        </div>


                    </div>

                }


            </div>






        </>
    )
}
