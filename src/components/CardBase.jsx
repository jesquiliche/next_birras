import { Card, Metric, Text, Flex, ProgressBar } from '@tremor/react'
import React from 'react'

const CardBase = ({title,metric,percent}) => {
  return (
    <Card maxWidth='max-w-sm border-2 rounded-md mx-4'>
        <Text>{title}</Text>
        <Metric>{metric}</Metric>
        <Flex marginTop='mt-4'>
            <Text>{percent} %</Text>
           
        </Flex>
        <ProgressBar percentageValue={percent} marginTop="mt-2" />
    </Card>
  )
}

export default CardBase