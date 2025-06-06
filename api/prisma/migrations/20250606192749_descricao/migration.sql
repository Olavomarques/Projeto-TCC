-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DadosFisicos` (
    `id_dadosfisicos` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `altura` DOUBLE NOT NULL,
    `peso` DOUBLE NOT NULL,
    `idade` INTEGER NOT NULL,
    `sexo` VARCHAR(191) NOT NULL,
    `exeReg` VARCHAR(191) NOT NULL,
    `obj` VARCHAR(191) NOT NULL,
    `deli` VARCHAR(191) NULL,

    PRIMARY KEY (`id_dadosfisicos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DadosMentais` (
    `id_dadosmentais` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `sonoPerDia` INTEGER NOT NULL,
    `trabPerDia` INTEGER NOT NULL,
    `tempHobby` INTEGER NOT NULL,
    `transt` VARCHAR(191) NULL,

    PRIMARY KEY (`id_dadosmentais`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DadosFisicos` ADD CONSTRAINT `DadosFisicos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DadosMentais` ADD CONSTRAINT `DadosMentais_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
