import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import HeaderUser from './HeaderUser';
import HeaderResponsiveUser from './HeaderResponsiveUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styleUser.css';
import client from '../api/client'; 

const HomeUserPage = () => {
  const [user, setUser] = useState(null)

  const userId = "685bb91a0eeff8b08e0e130b"; //Diana

  useEffect(() => {
    client
      .get(`/blakbox/users/${userId}`)
      .then(res => setUser(res.data))
      .catch(() =>
        setUser({
          firstName: '—',
          lastName: '',
          email: '—',
          phone: '—'
        })
      )
  }, [userId])

    if (!user) {
        return <div>Loading user data...</div>
    }

  return (
    <div className="bg-purple-darker text-white min-vh-100">
      <HeaderResponsiveUser />

      <div className="d-flex flex-column flex-lg-row min-vh-100">
        <HeaderUser />

        <main className="flex-fill bg-purple-darker p-4">
          <div className="container">
            <div className="mb-4 bg-purple-mid text-white p-3 rounded shadow-sm">
              <h2 className="m-0">Hi, {user.firstName} {user.lastName}</h2>
              <h2 className="m-0">Welcome to Blak Box</h2>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card bg-purple text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-accent">
                      <i className="bi bi-box-seam me-2"></i> Products
                    </h5>
                    <p className="card-text">
                      Explore our tech products, add them to your cart, and add them to your favorites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-purple text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-accent">
                      <i className="bi bi-cart3 me-2"></i> Cart
                    </h5>
                    <p className="card-text">
                      View the products you've added to your cart, along with their corresponding value and total, before checking out.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card bg-purple text-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-accent">
                      <i className="bi bi-person-circle me-2"></i> Profile
                    </h5>
                    <p className="card-text">
                      Manage your personal information and view your favorite products.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeUserPage;
