import { Router } from 'express';
import { glob } from 'glob'

const router = Router();

// DYNAMICALLLY LOAD ROUTES
const ext = (['production', 'development'].includes(process.env!.NODE_ENV as string)) ? 'js' : 'ts'
glob.sync(`**/*.${ext}`, {
    cwd: __dirname, ignore: [`index.${ext}`]
}).forEach(file => {
    const route = `/${file.replace(/\.[^/.]+$/, '').replace(/\\/g, '/')}`
    router.use(
        route,
        // ADD LOGGER MIDDLEWARE
        require(`./${file}`))
});

export default router
