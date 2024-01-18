import {PrismaClient} from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    // noinspection ES6ConvertVarToLetConst
    var prisma: ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma