


const environments = {};

environments.staging={
    port :3000,
    envName:'staging',
    secretKey : '111',
    maxChecks : 5,
}
environments.production={
    port :5000,
    envName:'production',
    secretKey : '222',
    maxChecks : 5,

}

const curentEnv= typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV :'staging';
const envToExport = typeof(environments[curentEnv]) === 'object' ?environments[curentEnv] : environments.staging;

module.exports = envToExport;