import React from "react";
import "./Register.css";



const Register = () => {

    return (
        <div className="RegisterPage">
            <h1>สร้างบัญชีผู้ใช้ใหม่</h1>
            <div className="InfoBox">
                <p>คุณจะได้รับอีเมลยืนยันทางอีเมลที่ได้กรอกไว้ด้านล่าง กรุณาตรวจสอบในกล่องจดหมายของคุณ</p>

                <div className="Email Info">
                    <div className="Info_text">
                        <h3 >อีเมล *</h3>
                    </div>
                    <input className="Input_Box" type="text" placeholder="กรอกอีเมลที่ใช้งาน" />
                </div>
                <div className="Username Info">
                    <div className="Info_text">
                        <h3 >username *</h3>
                    </div>
                    <input className="Input_Box" type="text" placeholder="กรอก username ที่ต้องการใช้งาน" />
                </div>
                <div className="Password Info">
                    <div className="Info_text">
                        <h3 >รหัสผ่าน *</h3>
                    </div>
                    <input className="Input_Box" type="text" placeholder="" />
                </div>
                <div className="ShowPassword Info">
                    <div className="checkbox_">
                        <input className="check_box" type="checkbox" />
                    </div>
                    <p>แสดงรหัสผ่าน</p>
                </div>
                <div className="PostNo Info">
                    <div className="Info_text">
                        <h3 >รหัสไปรษณีย์ *</h3>
                    </div>
                    <input className="Input_Box" type="text" placeholder="กรอกรหัสไปรษณีย์" />
                </div>
                <div className="BirthDate Info">
                    <div className="Info_text">
                        <h3 >วันเกิด *</h3>
                    </div>
                    <input className="Date_Box" type="date" value="" placeholder="dd-mm-yyyy"/>
                </div>
                <div className="Sex Info">
                    <div className="Info_text">
                        <h3 >เพศ *</h3>
                    </div>
                    <form className="Sex_Chooser radio_btn_group">
                        <div className="radio_btn">
                            <input type="radio"  name="drone" value="ชาย"  />
                            <label htmlFor="ชาย">ชาย</label>
                        </div>

                        <div className="radio_btn">
                            <input type="radio"  name="drone" value="หญิง" />
                            <label htmlFor="หญิง">หญิง</label>
                        </div>

                        <div className="radio_btn">
                            <input type="radio"  name="drone" value="เฮลิคอปเตอร์จู่โจม" />
                            <label htmlFor="เฮลิคอปเตอร์จู่โจม">เฮลิคอปเตอร์จู่โจม</label>
                        </div>
                    </form>
                </div>
                <div className="BuyOrSell Info">
                    <div className="Info_text">
                        <h3 >คุณต้องการที่จะ *</h3>
                    </div>
                    <form className="BuyOrSell_Chooser radio_btn_group">
                        <div className="radio_btn">
                            <input type="radio"  name="drone" value="ซื้อ"  />
                            <label htmlFor="ซื้อ">ซื้อ</label>
                        </div>

                        <div className="radio_btn">
                            <input type="radio"  name="drone" value="ขาย" />
                            <label htmlFor="ขาย">ขาย</label>
                        </div>
                    </form>
                </div>
                <div className="Info">
                <button type="button" className="Register_btn"> สร้างบัญชี</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
