import '../styles/header.css';

function Header({ title2, showTitle2 = true }) {

    return (
        <div className='header-container'>
            <h2 className='header-text1'>WeatherInfo</h2>
            {showTitle2 && <h2 className='header-text2'>{title2}</h2>}
        </div>
    );
}

export default Header;
