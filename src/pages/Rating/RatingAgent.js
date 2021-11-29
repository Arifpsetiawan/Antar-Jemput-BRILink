import { Button, Rate, Typography , Progress} from "antd"
import React, { useState } from "react"
import { useHistory } from "react-router-dom"

const desc = ["terrible", "bad", "normal", "good", "wonderful"]

const { Text } = Typography

function RatingAgent(props) {

    let numberOfRating = props.transaction.rating
    if(isNaN(numberOfRating)) numberOfRating = 0

    let totalReview = props.transaction.userAgent.agent.totalReviewTransactions

    return (
        <div className="outer-rate">
            <div className="inner-rate">
                <Text
                    style={{
                        textAlign: "center",
                        color: "#292961",
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "30px",
                        marginLeft: "50px",
                    }}
                >
                   Rating Customer
                </Text>{" "}
                <br /> <br />
                <span>
          <Text
              style={{ marginLeft: "100px", fontWeight: "bold", fontSize: "30px" }}
          >

             {Math.floor(numberOfRating).toFixed(1)}
          </Text>
          <Text> / 5</Text> <br />
          <Rate
              allowHalf
              value={Math.floor(numberOfRating).toFixed(1)}
              style={{ marginRight: "15px", marginLeft: "70px" }}
          />
        </span> <br /> <br />
         <Text style={{marginLeft:"100px"}}>{totalReview ? totalReview : 0  } Transaksi</Text>
                <br /> <br />
            </div>
        </div>
    )
}

export default RatingAgent
