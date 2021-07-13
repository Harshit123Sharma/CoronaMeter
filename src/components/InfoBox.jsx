import React from "react";
import {Card} from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import "../styles/InfoBox.css";

function InfoBox({ subject, cases, numbers, ...props }) {
    
    var forStyle = "";
    if (subject === "Cases") {
        forStyle="caseStyle";
    } else if (subject === "Recovered") {
        forStyle="recoverStyle";
    } else {
        forStyle="lastStyle";
    }

    return (
        
            <Card 
            onClick={props.onClick}
            className={forStyle}>
                <CardContent>

                    <Typography className="infoBox__title" color="textSecondary">{subject}</Typography>

                    <h2 className="infoBox__cases">{cases}</h2>
                    
                    <Typography className="infoBox__total" color="textSecondary">{numbers} Total</Typography>

                </CardContent>
            </Card>
            
    )
}

export default InfoBox;
