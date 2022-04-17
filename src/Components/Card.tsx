import React from 'react';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';

interface CardInteface {
    Title: string;
    ShortDescription: string;
    Author: string;
    redirectLink: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CardComponent = (props: CardInteface) => {

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
      ? theme.colors.dark[1]
      : theme.colors.gray[7];
    
    return (
    <div>
    <div style={{ width: 340 }}>
      <Card shadow="sm" p="lg">  

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Group position="left" style={{ textAlign: 'center' }}>
            <Text weight={500} style={{textAlign: 'center', justifyContent: 'center'}}>{props.Title}</Text>
          </Group>
          <Group position="right">
            <Badge color="indigo" variant="light">
                {props.Author}
            </Badge>
          </Group>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {props.ShortDescription}
        </Text>

        <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }} onClick={() => {window.location.href=`/blogs/${props.redirectLink}`}}>
          Read More
        </Button>
      </Card>
    </div>
    </div>
    )
}

export default CardComponent;