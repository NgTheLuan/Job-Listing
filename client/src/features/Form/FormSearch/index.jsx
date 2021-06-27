import React, { Component } from "react";

const FormSeach = () => {
  return (
    <section className="bottom-search-form">
      <div className="container">
        <form className="bt-form">
          ``
          <div className="col-md-4 col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Skills, Designations, Keyword"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <select id="choose-city" className="form-control">
              <option>All City</option>
              <option value="HCM">Hồ Chí Minh</option>
              <option value="HN">Hà Nội</option>
              <option value="AG">An Giang</option>
              <option value="BRVT">Bà Rịa - Vũng Tàu</option>
              <option value="BC">Bắc Cạn</option>
              <option value="BG">Bắc Giang</option>
              <option value="BL">Bạc Liêu</option>
              <option value="BN">Bắc Ninh</option>
              <option value="BT">Bến Tre</option>
              <option value="BD">Bình Dương</option>
              <option value="BP">Bình Phước</option>
              <option value="BT">Bình Thuận</option>
              <option value="CM">Cà Mau</option>
              <option value="CT">Cần Thơ</option>
              <option value="CB">Cao Bằng</option>
              <option value="GL">Gia Lai</option>
              <option value="HG">Hà Giang</option>
              <option value="HN">Hà Nam</option>
              <option value="HT">Hà Tĩnh</option>
              <option value="HD">Hải Dương</option>
              <option value="HP">Hải Phòng</option>
              <option value="HG">Hậu Giang</option>
              <option value="HB">Hoà Bình</option>
              <option value="HY">Hưng Yên</option>
              <option value="KH">Khánh Hoà</option>
              <option value="KG">Kiên Giang</option>
              <option value="KT">Kon Tum</option>
              <option value="LC">Lai Châu</option>
              <option value="LD">Lâm Đồng</option>
              <option value="LS">Lạng Sơn</option>
              <option value="LC">Lào Cai</option>
              <option value="LA">Long An</option>
              <option value="ND">Nam Định</option>
              <option value="NA">Nghệ An</option>
              <option value="NB">Ninh Bình</option>
              <option value="NT">Ninh Thuận</option>
              <option value="NN">Nước Ngoài</option>
              <option value="PT">Phú Thọ</option>
              <option value="PY">Phú Yên</option>
              <option value="QB">Quảng Bình</option>
              <option value="QN">Quảng Nam</option>
              <option value="QN">Quảng Ngãi</option>
              <option value="QN">Quảng Ninh</option>
              <option value="QT">Quảng Trị</option>
              <option value="ST">Sóc Trăng</option>
              <option value="SL">Sơn La</option>
              <option value="TN">Tây Ninh</option>
              <option value="TB">Thái Bình</option>
              <option value="TN">Thái Nguyên</option>
              <option value="TH">Thanh Hoá</option>
              <option value="TTH">Thừa Thiên Huế</option>
              <option value="TG">Tiền Giang</option>
              <option value="TQ">Toàn Quốc</option>
              <option value="TV">Trà Vinh</option>
              <option value="TQ">Tuyên Quang</option>
              <option value="VL">Vĩnh long</option>
              <option value="VP">Vĩnh Phúc</option>
              <option value="YB">Yên Bái</option>
              <option value="DN">Đà Nẵng</option>
              <option value="DL">Đắk Lắk</option>
              <option value="DN">Đắk Nông</option>
              <option value="DB">Điện Biên</option>
              <option value="DN">Đồng Nai</option>
              <option value="DT">Đồng Tháp</option>
            </select>
          </div>
          <div className="col-md-4 col-sm-6" style={{ marginTop: "-1.9%" }}>
            <input
              type="text"
              className="form-control"
              id="companies"
              placeholder="Companies"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Search By location"
            />
          </div>
          <div className="col-md-4 col-sm-6">
            <select className="form-control">
              <option>Category</option>
              <option value="Journalist">Journalist</option>
              <option value="realestate">Real estate</option>
              <option value="it">Information technology</option>
              <option value="sports">Sports</option>
              <option value="bank">Bank</option>
              <option value="spa">Spa</option>
              <option value="guard-security">Guard - Security</option>
              <option value="laborsafety">Labor safety</option>
              <option value="sales-business">Sales - Business</option>
              <option value="wholesale-retail">Wholesale - Retail</option>
              <option value="lifeinsurance">Life insurance</option>
              <option value="translators">Translators</option>
              <option value="Post-telecommunication">
                Post - Telecommunication
              </option>
              <option value="breed-veterinary">Breed - Veterinary</option>
              <option value="stock">Stock</option>
              <option value="biotechnology">Biotechnology</option>
              <option value="nutrition">Nutrition</option>
              <option value="mechanical">Mechanical</option>
              <option value="oilandgas">Oil and gas</option>
              <option value="textile">Textile</option>
              <option value="tourism">Tourism</option>
              <option value="pharmaceutical">pharmaceutical</option>
              <option value="electronic">Electronic</option>
              <option value="carpenter">Carpenter</option>
              <option value="entertaiment">Entertaiment</option>
              <option value="education">Education</option>
              <option value="nautical">Nautical</option>
              <option value="aviation">Aviation</option>
              <option value="accountant">Accountant</option>
              <option value="architecture">Architecture</option>
              <option value="law">Law</option>
              <option value="restauranthotel">Restaurant Hotel</option>
            </select>
          </div>
          <div className="col-md-4 col-sm-6">
            <button type="submit" className="btn btn-primary">
              Search Job
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormSeach;
