var domain;

if (process.env.NODE_ENV === 'production') {
    domain='https://charming-jalebi-198b2d.netlify.app/'
} else {
    domain= 'http://localhost:3000'
}

export default domain
