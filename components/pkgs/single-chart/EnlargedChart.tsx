import React from 'react';
import { Modal } from '../../index'

const Open =  () => {
    alert('open')
    return <Modal
          visible={true}
          title={"测试"}
          width={"calc(70vw)"}
        >
            测试123
        </Modal>
}

const LargeChart = () => {

}

LargeChart.open = Open

export default LargeChart