import React, { lazy, useCallback, useEffect, useState } from 'react'
import '../styles/profile.css'
import ProfileCard from '../components/ProfileCard';
import QuizMarkDetailsCard from '../components/QuizMarkDetailsCard';
import CertificateDetailsCard from '../components/CertificateDetailsCard';
import avatar from '../assets/user.png'
import axios from 'axios';
import { getUserID } from '../util/Authentication';
import LodingSpinner from '../components/LodingSpinner';
import ProfileImage from '../components/ProfileImage';

const Navbar = lazy(() => import('../components/Navbar'))
const Footer = lazy(() => import('../components/Footer'))

export default function Profile() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // fetch data
  const fetchLeaderBoard = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`accounts/user/${getUserID()}`)
      .then((response) => {
        if (response.status === 200) {
          setUser(response?.data);
          // console.log(response?.data)
        }
      })
      .catch((error) => {
        console.log("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setUser, setLoading]);

  useEffect(() => {
    fetchLeaderBoard()
  }, [fetchLeaderBoard]);

  // if data is fetching show loading spinner for user
  if (loading) return <LodingSpinner />;
  return (
    <>
      <Navbar page={'profile'} />
      <div className="profile-banner">

        <div className='container' style={{ maxWidth: '40rem', }}>
          <div className='d-flex flex-column flex-md-row align-items-center justify-content-center' style={{ padding: '5rem' }}>
            <div className='me-2'>
            <ProfileImage src={user?.profile} size={'200px'}/>
            </div>

            <div>
              <h2 className='text-black m-0'>Hello {user?.username} !</h2>
              {/* <p className='text-white d-none d-md-block fw-bold p-0 m-0'>{user?.first_name}{" "}{user?.last_name} </p> */}
              {/* <p className='text-white d-none d-md-block p-0 m-0'>{user?.address}</p> */}
              <p className='fw-bold d-none d-md-block p-0 m-0'>{user?.email}</p>
              <h3 className='text-white p-0 m-0'>⭐{user?.score}XP</h3>
            </div>
          </div>

        </div>

      </div>
<br></br>


      <div className="container mb-3">
        <div className="main-body">


          <div className="row gutters-sm">

            <h3><i class="bi bi-person-lines-fill me-2"></i>Profile</h3>

            <ProfileCard user={user} />

            <div className="row gutters-sm">


             {/* <QuizMarkDetailsCard />


            <CertificateDetailsCard />*/}



            </div>
          </div>

        </div>
      </div>


      <Footer />
    </>
  );
}
