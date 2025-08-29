import "./Form.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const nav = useNavigate();
  const formRef = useRef(0);
  // 빈칸넣었을 때 alert 띄우기
  const keyToLabel = {
    name: "이름",
    phone: "연락처",
    hak: "학번",
    type: "구분",
  };

  //확인 버튼 누를 때 gameStart 함수 실행
  const gameStart = () => {
    if (formRef.current > 0) {
      nav("/game", { replace: true }); // 폼 제출 후 뒤로가기 방지
      formRef.current = 0;
    }
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "student") {
      setStudentForm({ ...studentForm, [name]: value });
    } else {
      setVisitortForm({ ...visitorForm, [name]: value });
    }
  };
  const [formType, setFormType] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: "",
    phone: "",
    hak: "",
  });
  const [visitorForm, setVisitortForm] = useState({
    name: "",
    phone: "",
  });

  // checkReg 이해하기..
  const checkReg = async (e) => {
    e.preventDefault(); // 새로고침 방지

    let data;
    if (formType === "student") {
      data = { type: "student", ...studentForm };
    } else if (formType === "visitor") {
      data = { type: "visitor", ...visitorForm };
    } else {
      alert("재학생/방문객을 선택하세요.");
      return;
    }

    // 빈칸 검사 ||는 혹시모를 일 대비
    for (const key in data) {
      if (!data[key]) {
        alert(`${keyToLabel[key] || key}을(를) 입력하세요.`);
        return;
      }
    }

    // 서버로 데이터 전송
    try {
      // const response = await fetch("http://your-backend-url/api/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // if (response.ok) {
      //   alert("등록 성공!");
      //   formRef.current +=1; // 폼에 1증가
      //   gameStart();
      // } else {
      //   alert("등록 실패!");
      // }
      console.log("서버로 보낼 데이터:", data);
      if (data) {
        formRef.current += 1; // 폼에 1증가
        console.log(formRef.current);
        gameStart();
      }
    } catch (err) {
      alert("서버 오류!");
    }

    // form태그의 url 지정하기 (url주소는 나중에 기입)
    // 유효성검사하기 빈칸이거나 해당태그에 focus 이벤트 주고 return
    // 해당 정보를 name, phone , hak 을 객체로 묶기 Client
    // 유효성 검사 끝나면 submit 이벤트 발생시키기
  };
  // const onClickRadio = (e, setFormType) => {
  //   const value = e.target.value;

  return (
    <div className="form-container">
      <div className="form-form">
        <form
          className="info-form"
          name="infoForm"
          method="post"
          onSubmit={checkReg}
        >
          <div className="form-setting">{/* 설정 아이콘 */}</div>
          <h2 className="form-title">정보 입력</h2>
          <div className="form-radio-group">
            <label>
              <input
                type="radio"
                name="type"
                value="student"
                onChange={() => setFormType("student")}
                checked={formType === "student"}
              />{" "}
              재학생
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="visitor"
                onChange={() => setFormType("visitor")}
                checked={formType === "visitor"}
              />{" "}
              방문객
            </label>
          </div>
          {formType === "student" && (
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="이름"
                pattern="^[가-힣a-zA-Z]+$"
                name="name"
                value={studentForm.name}
                onChange={(e) => handleChange(e, "student")}
              />

              <input
                className="form-input"
                type="text"
                inputmode="numeric"
                pattern="^0\d{8,10}$"
                placeholder="연락처"
                name="phone"
                value={studentForm.phone}
                onChange={(e) => handleChange(e, "student")}
              />

              <input
                className="form-input"
                type="text"
                inputmode="numeric"
                pattern="^\d{10}$"
                placeholder="학번"
                name="hak"
                value={studentForm.hak}
                onChange={(e) => handleChange(e, "student")}
              />
            </div>
          )}
          {formType === "visitor" && (
            <div>
              <input
                className="form-input"
                type="text"
                placeholder="이름"
                name="name"
                pattern="^[가-힣a-zA-Z]+$"
                value={visitorForm.name}
                onChange={(e) => handleChange(e, "name")}
              />

              <input
                className="form-input"
                type="text"
                pattern="^0\d{8,10}$"
                placeholder="연락처(-없이 숫자만)"
                name="phone"
                value={visitorForm.phone}
                onChange={(e) => handleChange(e, "visitor")}
              />
            </div>
          )}
          <button className="form-submit-btn" type="submit">
            확 인
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
