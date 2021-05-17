import { Box } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import { Textarea } from '@chakra-ui/textarea'
import React, { Component } from 'react'

export default class InstructionEdit extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.input.focus()
        this.input.setSelectionRange(this.input.value.length, this.input.value.length)
    }

    render() {
        return (
            <Box key={this.props.index} position="relative" width="100%" minHeight="8vh" mb={4} borderRadius={10} background="blue.100">
                <Textarea ref={(Textarea) => {this.input = Textarea;}} id="instructionEdit" margin="0" width="100%" height="100%" onBlur={(event) => this.props.confirmEditOnBlur(event)} onKeyDown={(event) => this.props.confirmEditInstruction(event)} resize="none" defaultValue={this.props.prevInstruction}/>
                <Tag borderRadius="full" colorScheme="gray" zIndex="99" position="absolute" top="0" left="0" transform="translateX(-50%) translateY(-50%)">{this.props.index+1}</Tag>
            </Box>
        )
    }
}
