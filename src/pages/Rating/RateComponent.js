import { Button, Rate, Typography, Row, Col } from 'antd';
import React, {useCallback, useState} from "react"
import {useHistory} from "react-router-dom";
import useCreateRate from "../../Mutations/useCreateRate";
import Image from "../../assets/image/profile.svg"
import Swal from "sweetalert2";



const { Text } = Typography
const desc = ["Buruk", "Kurang Baik", "OK", "Baik", "Sangat Baik"]

function RateComponent(props) {
  const [currentValue, setCurrentValue] = useState(0)
   const history = useHistory()

  const handleChange = (value) => {
    setCurrentValue(value)
  }

  const { mutate: createRate } = useCreateRate(
        props.transaction.id,
        {rating: currentValue},
      props.refetchTransactions,
    )



    return (
    <div>
      <Row>
          <Col>
              <img
                  src={Image}
                  alt="user"
                  className="brand-image img-circle elevation-3"
                  style={{ opacity: ".8" }}
              />
          </Col>
          <Col style ={{marginLeft:"20px"}}>
              {props?.transaction?.userAgent?.agent?.agentName}
          </Col>
      </Row>
        <span>
             {/*{currentValue ? (*/}
             {/*    <span className="ant-rate-text" style={{marginLeft:"90px", marginTop:"20px"}}>{desc[currentValue - 1]}</span>*/}
             {/*)  : (*/}
             {/*    ""*/}
             {/*)} <br />*/}
          <Rate onChange={handleChange} value={currentValue} style={{marginLeft:"70px", marginTop:"10px"}}/> <br /> <br />
        </span>
        <br /> <br />

        {/*<Button style={{marginBottom:"30px", marginLeft:"30px", borderRadius:"5px", border:"2px solid white", width:"250px",*/}
        {/*    backgroundColor:"#FF6366", color:"white", fontFamily:"sans-serif"}}*/}
        {/*        onClick={createRate} > Kirim </Button> <br />*/}
    </div>
  )
}

export default RateComponent
