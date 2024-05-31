import pictureUnderConstruction from './UnderConstruction.png';
import './UnderConstruction.scss';

export default function UnderConstruction(props) {
    return (
        <div className="page-under-construction">
            <div className="picture-area">
                <img src={pictureUnderConstruction} />
            </div>
        </div>
    )
}