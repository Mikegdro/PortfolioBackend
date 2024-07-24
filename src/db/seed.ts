import { db } from "../db";

import { Company, Experience, PersonalProject, PrivateProject, Project, Tecnology, tecnologyToProject } from "../db/schema";

import * as types from "../types";
import { errorHandler } from "../utils";

import { createTransaction } from "../db";
import { sql } from "drizzle-orm";

// Main entrypoint of the seeding module
const main = async () => {

    // DB Teardown
    await teardown()

    // Seeds
    try {
        SeedCivicaData();
        SeedPersonalProjectsData(); 
    } catch (err) {
        errorHandler(`CivicaData crashed \n${err}`);
    }

}

export default main

/**
 *  This functions tears down the tables so the seeding doesn't fail.
 * 
 */
const teardown = async () => {

    console.log('Seeding DB...')
    console.time('DB has been seeded!')

    await db.delete(Experience)
    await db.delete(Company)
    await db.delete(PrivateProject)
    await db.delete(PersonalProject)
    await db.delete(Project)
    await db.delete(Tecnology)
    await db.delete(tecnologyToProject)

    console.timeEnd('DB has been seeded!')
    
    return
}

const SeedPersonalProjectsData = async () => {
    seedPortfolioFront()
    seedPortfolioBack()
    seedGoAuth()
}

/**
 *  Function with the data to seed this project.
 * 
 */
const seedPortfolioFront = async () => {

    // Project
    const PortFront: types.NewProject = {
        name: 'PortfolioFrontend',
        type: 'personal'
    }

    const projectData: types.Project[] = await seedProject(PortFront)

    // Personal Project
    const PortFrontPersonal: types.NewPersonalProject = {
        idProject: projectData[0].id,
        title: 'My personal webpage front-end developed with Astro, TailwindCSS & DaisyUI🚀',
        repository: '',
        image: '',
        imageReduced: ''
    }

    seedPersonalProject(PortFrontPersonal)

    // Tecnologies
    const frontTech: types.NewTecnology[] = [{
        name: 'Astro',
        description: 'Astro is a JavaScript web framework optimized for building fast, content-driven websites.',
        site: 'https://astro.build/',
        twitter: 'https://x.com/astrodotbuild',
        type: 'frontend',
        logo: 'https://astro.build/assets/press/astro-logo-dark.svg'
    }, {
        name: 'TailwindCSS',
        description: 'Rapidly build modern websites without ever leaving your HTML.',
        site: 'https://tailwindcss.com/',
        twitter: 'https://twitter.com/tailwindcss',
        type: 'frontend',
        logo: 'https://tailwindcss.com/brand/tailwindcss-logotype.zip'
    }, {
        name: 'DaisyUI',
        description: 'The most popular component library for Tailwind CSS',
        site: 'https://daisyui.com/',
        twitter: '',
        type: 'frontend',
        logo: 'https://img.daisyui.com/images/daisyui-logo/daisyui-logotype.svg'
    }]

    seedTecnology(frontTech, projectData[0].id)
}

/**
 *  Function with the data to seed this project.
 * 
 */
const seedPortfolioBack = async () => {
    const PortBack: types.NewProject = {
        name: 'PortfolioBackend',
        type: 'personal'
    }

    const projectData: types.Project[] = await seedProject(PortBack)

    const PortBackPersonal: types.NewPersonalProject = {
        idProject: projectData[0].id,
        title: 'My API developed with NodeJS, Express, Typescript & Drizzle',
        repository: '',
        image: '',
        imageReduced: ''
    }

    seedPersonalProject(PortBackPersonal)
}

/**
 *  Function with the data to seed this project.
 * 
 */
const seedGoAuth = async () => {
    const GoAuth: types.NewProject = {
        name: 'GoAuth',
        type: 'personal'
    }

    const projectData = await seedProject(GoAuth)

    const GoAuthPersonal: types.NewPersonalProject = {
        idProject: projectData[0].id,
        title: 'My own Auth server to protect my personal DB',
        repository: '',
        image: '',
        imageReduced: ''
    }

    seedPersonalProject(GoAuthPersonal)
}

/**
 *  Seeds the given project to the Database.
 * 
 *  @param project 
 *  @returns Promise<types.Project>
 */
const seedProject = async (project: types.NewProject) => {
    return await db.insert(Project).values(project).onConflictDoUpdate({
        targetWhere: sql`name <> ${project.name}`,
        target: Project.name,
        set: {
            name: project.name
        }
    }).returning()
}

/**
 *  Seeds the given PrivateProject to the Database.
 * 
 *  @param project 
 *  @param idProject 
 *  @param companyId 
 *  @param experienceId 
 * 
 *  @returns Promise<types.PersonalProject>
 */
const seedPrivateProject = async (project: types.NewPrivateProject) => {
    await db.insert(PrivateProject).values(project).onConflictDoNothing()
}

/**
 *  Seeds the given personal project to the DB.
 * 
 *  @param project 
 *  @param idProject 
 * 
 *  @returns 
 */
const seedPersonalProject = async (project: types.NewPersonalProject) => {
    await db.insert(PersonalProject).values(project).onConflictDoNothing()
}

/**
 *  Seeds the given company to the Database.
 * 
 *  @param company 
 *  @returns 
 */
const seedCompany = async (company: types.NewCompany) => {
    return await db.insert(Company).values(company).onConflictDoUpdate({
        targetWhere: sql`name <> ${company.name}`,
        target: Company.name,
        set: {
            name: company.name
        }
    }).returning();
}

/**
 *  Seeds the given experience to the Database.
 * 
 *  @param experience 
 *  @param companyId 
 *  @returns Promise<types.Experience[]>
 */
const seedExperience = async (experience: types.NewExperience) => {
    return await db.insert(Experience).values(experience).returning()
}

/**
 *  Seeds the given Tecnologies to the Database and binds all of them to a given project.
 * 
 *  @param tecnology 
 *  @param projectId 
 */
const seedTecnology = async (tecnology: types.NewTecnology[], projectId: string) => {
    const tecnologies: types.Tecnologies[] = await db.insert(Tecnology).values(tecnology).onConflictDoNothing()

    for (let tech of tecnologies ) {
        await db.insert(tecnologyToProject).values({projectId, tecnologyId: tech.id}).onConflictDoNothing()
    }
}

const SeedCivicaData = async () => {

    // Companies
    const civicaCompany: types.NewCompany = {
        name: 'Civica-Software',
        description: 'Cívica es una empresa especializada en el desarrollo de soluciones de negocio basadas en tecnología y en la ejecución de proyectos de Transformación Digital, Business Intelligence e Integración de Sistemas.',
        linkedin: 'https://linkedin.com/company/civica-soft/',
        logo: 'https://civica-soft.com/wp-content/themes/civica/assets/images/logo_civica.png'
    }

    const companyData = await seedCompany(civicaCompany)

    // Experience
    const fullstackExp: types.NewExperience = {
        role: "fullstack",
        companyId: companyData[0].id,
        description: "Posición de desarrollador fullstack utilizando Java 17 y Angular 14 para el desarrollo de una aplicación web reactiva y API dinámica con CRUD.",
        startDate: new Date('2023-06-27').toUTCString(),
        endDate: new Date('2023-10-17').toUTCString(),
    }

    const experienceData = await seedExperience(fullstackExp)

    // Project
    const civicaDeveloper: types.NewProject = {
        name: 'Reactive Web-page for Spanish Retail chain, API & DB management',
        type: 'private'
    }

    const civicaProject = await seedProject(civicaDeveloper)

    // Private
    const civicaDeveloperPrivate: types.NewPrivateProject = {
        title: 'Development of a Fullstack application for a Spanish retailer using Java & Angular',
        companyId: companyData[0].id,
        experienceId: experienceData[0].id,
        idProject: civicaProject[0].id,
        startDate: experienceData[0].startDate,
        endDate: experienceData[0].endDate,
    }

    seedPrivateProject(civicaDeveloperPrivate)

    // Tecnologies
    const Tecnologies: types.NewTecnology[] = [];

    const java: types.NewTecnology = {
        name: 'Java',
        description: 'Java es el término general utilizado para designar el software y sus componentes: Java Runtime Environment (JRE), Java Virtual Machine (JVM) y plugin. Cuando los mensajes de error contienen términos como JRE, JVM o plugin, los mantenemos.',
        logo: 'https://worldvectorlogo.com/es/download/java.svg',
        twitter: 'https://x.com/java',
        site: 'https://www.java.com/es/',
        type: 'backend'
    }

    const angular: types.NewTecnology = {
        name: 'Angular',
        description: 'Angular is a web framework that empowers developers to build fast, reliable applications.',
        logo: 'https://logosandtypes.com/wp-content/uploads/2024/01/angular.svg',
        twitter: 'https://x.com/angular',
        site: 'https://angular.dev/',
        type: 'frontend'
    }

    Tecnologies.push(java, angular)

    seedTecnology(Tecnologies, civicaProject[0].id);
}