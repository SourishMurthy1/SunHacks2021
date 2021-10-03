import React from 'react';
import SearchBar from '../Components/SearchBar'
import ActionCards from '../Components/ScriptCards'
import DiolougeBox from '../Components/Dialogue'
const Transcripts = (props) => {
    return (
        <div>
                <h1 style = {{textAlign: 'center'}}>Dashboard</h1>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop: '50px'}}>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div style={{ paddingRight: '10px' }}>
                        <DiolougeBox name='Highlights'/>
                    </div>
                    <div style={{ paddingRight: '10px' }}>
                        <DiolougeBox name='Topics' />
                    </div>
                    <div style={{ paddingRight: '10px' }}>
                        <DiolougeBox name='Trancript'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transcripts;