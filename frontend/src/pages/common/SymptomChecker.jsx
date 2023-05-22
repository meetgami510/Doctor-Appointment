import React from "react";
import Layout from "../../components/Layout/Layout";
import _ from "lodash";
import { useState } from "react";
import "../../styles/SymptomChecker.css";

const createPatient = () => {
  const symptoms = {};
  let sex = "male";
  const age = { value: 30 };

  const setSex = (newSex) => {
    sex = newSex;
  };

  const setAge = (newAge) => {
    age.value = newAge;
  };

  const addSymptomsGroup = (group) => {
    Object.assign(symptoms, group);
  };

  const removeSymptom = (id) => {
    delete symptoms[id];
  };

  const toDiagnosis = () => {
    const res = {
      sex,
      age,
      evidence: [],
    };

    res.evidence = _.map(symptoms, (symptom, symptomId) => {
      const getChoiceId = (choice) => {
        if (choice === true) {
          return "present";
        }
        if (choice === false) {
          return "absent";
        }
        return "unknown";
      };

      const diagnosisSymptom = {
        id: symptomId,
        choice_id: getChoiceId(symptom.reported),
      };

      if (symptom.source === "initial") {
        Object.assign(diagnosisSymptom, {
          source: "initial",
        });
      }

      if (symptom.source === "suggest") {
        Object.assign(diagnosisSymptom, {
          source: "suggest",
        });
      }

      return diagnosisSymptom;
    });
    return res;
  };

  const toSuggest = () => {
    return toDiagnosis();
  };

  const toParse = (text) => {
    return {
      text,
      sex,
      age,
    };
  };

  const reset = () => {
    Object.keys(symptoms).forEach((symptomId) => {
      delete symptoms[symptomId];
    });
  };

  return {
    setSex,
    setAge,
    addSymptomsGroup,
    removeSymptom,
    toDiagnosis,
    toSuggest,
    toParse,
    reset,
  };
};

var interviewId = null;
var appId = "c6aba95c";
var appKey = "6cf752edb2e8c9e14a42bd3f53a33a09";

const InfermedicaApi = (
  apiModel = "infermedica-en",
  apiUrl = "https://api.infermedica.com/v3/"
) => {
  const generateInterviewId = () => {
    const uuidv4 = () => {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      ); // eslint-disable-line
    };

    interviewId = uuidv4();
  };

  const request = async (method, url, data) => {
    const headers = new Headers();
    headers.append("App-Id", appId);
    headers.append("App-Key", appKey);
    headers.append("Model", apiModel);
    headers.append("Content-Type", "application/json");

    if (interviewId) {
      headers.append("Interview-Id", interviewId);
    }

    const response = await fetch(apiUrl + url, {
      method,
      headers,
      body: data,
    });
    return await response.json();
  };

  const get = (url) => {
    return request("GET", url);
  };

  const post = (url, data) => {
    return request("POST", url, data);
  };

  const getRiskFactors = (age) => {
    return get(`risk_factors?age.value=${age.value}`);
  };

  const parse = (data) => {
    return post("parse", JSON.stringify(data));
  };

  const getSuggestedSymptoms = (data) => {
    return post("suggest", JSON.stringify(data));
  };

  const diagnosis = (data) => {
    return post("diagnosis", JSON.stringify(data));
  };

  const explain = (data) => {
    return post("explain", JSON.stringify(data));
  };

  return {
    generateInterviewId,
    getRiskFactors,
    parse,
    getSuggestedSymptoms,
    diagnosis,
    explain,
  };
};

// export default InfermedicaApi;

function SymptomChecker() {
  const api = InfermedicaApi(); // doubt
  const patient = createPatient();

  api.generateInterviewId();
  const temp = async () => {
    // const text = "jello";
    // const age = 30;
    // const sex = "male";
    // const data = await api.parse({ text, sex, age: parseInt("30") });
    // console.log(data)
  };
  temp();
  const [obj, setObj] = useState({
    text: "i feel smoach pain but no couoghing today",
    sex: "male",
    age: { value: 30 },
  });
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setObj((prevState) => ({ ...prevState, [name]: value }));
  };
  const { age, sex, text } = obj;
  const [conditions, setConditions] = useState([]);
  const [question, setQuestion] = useState("");
  const [symptom, setSymptom] = useState("");
  const [evidence, setEvidence] = useState([]);
  const processAns = async (evidence) => {
    const body = {
      sex,
      age: {
        value: parseInt(age),
      },
      evidence,
      extras: {
        disable_groups: true,
      },
    };
    
    const resp = await api.diagnosis(body);
    setConditions(resp.conditions);
    console.log(resp);
    if (resp.question) {
      setSymptom(resp.question.items[0].id);
      setQuestion(resp.question.text);
    } else setQuestion("");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempObj = { text, sex, age: { value: parseInt(age) } };
    console.log(tempObj);
    const data = await api.parse(tempObj);
    console.log(data);
    const { mentions } = data;
    let evidence = mentions.map((m) => {
      let evd = {
        id: m.id,
        choice_id: m.choice_id,
        source: "initial",
      };
      return evd;
    });
    setEvidence(evidence);
    console.log(data);
    processAns(evidence);
  };

  const selectAns = async (event) => {
    const ans = event.target.value;
    const temp = [...evidence, { id: symptom, choice_id: ans }];
    setEvidence((prevState) => [...prevState, { id: symptom, choice_id: ans }]);
    processAns(temp);
  };
  return (
    <Layout>
      {/* <form className="flex justify-center items-center gap-2" onSubmit={handleSubmit}>
  <input className="border border-gray-300 rounded-md py-2 px-4" type="number" name="age" value={age} placeholder="give your age" onChange={handleChange} />
  <input className="border border-gray-300 rounded-md py-2 px-4" type="text" name="sex" value={sex} placeholder="give your gender" onChange={handleChange} />
  <input className="border border-gray-300 rounded-md py-2 px-4" type="text" name="text" value={text} placeholder="what are you feeling" onChange={handleChange} />
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
</form> */}
      <form className="form-container" onSubmit={handleSubmit}>
        Age :
        <input
          className="form-input"
          type="number"
          name="age"
          value={age}
          placeholder="give your age"
          onChange={handleChange}
        />
        <input
          className="form-input"
          type="text"
          name="sex"
          value={sex}
          placeholder="give your gender"
          onChange={handleChange}
        />
        Enter Your Feeling :
        <input
          className="form-input"
          type="text"
          name="text"
          value={text}
          placeholder="what are you feeling"
          onChange={handleChange}
        />
        <button className="form-submit" type="submit">
          submit
        </button>
      </form>

      <div className="conditions">
        {conditions.map((c, index) => (
          <div className="condition" key={index}>
            <div>name: {c.name}</div>
            <div>common name: {c.common_name}</div>
            <div>probability: {c.probability * 100}%</div>
          </div>
        ))}
      </div>

      {question !== "" && (
        <div className="question-container">
          <div>{question}</div>
          <button className="question-btn" onClick={selectAns} value="present">
            yes
          </button>
          <button className="question-btn" onClick={selectAns} value="absent">
            no
          </button>
          <button className="question-btn" onClick={selectAns} value="unknown">
            Don't know
          </button>
        </div>
      )}
    </Layout>
  );
}

export default SymptomChecker;