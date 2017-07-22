/**
 * Created by Agnieszka on 20.07.2017.
 */
import React from "react";
import {Card, CardHeader, CardText} from "material-ui/Card";
import {colors as Colors} from "material-ui/styles";
import {List, ListItem} from "material-ui/List";
import CellIcon from "material-ui/svg-icons/av/stop";

const CardExampleExpandable = () => (
    <Card style={{backgroundColor: Colors.blue700, width: '350px', alignSelf: 'flex-start'}}>
        <CardHeader
            title="Pathfinder"
            subtitle="Graph & pathfinding app"
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardText expandable={true}>
            <List>
                <ListItem primaryText="Green cell- start" leftIcon={<CellIcon color={Colors.greenA700}/>}/>
                <ListItem primaryText="Red cell - finish" leftIcon={<CellIcon color={Colors.redA700}/>}/>
                <ListItem primaryText="Dark blue - barrier" leftIcon={<CellIcon color={Colors.indigo800}/>}/>
            </List>
            <p>Click on the grid map to create barrier, then use "SEARCH PATH"
                button to find the shortest path between two cells.
                If you want to change position START and END cells,
                push target and drag to another place.
            </p>
        </CardText>
    </Card>
);

export default CardExampleExpandable;