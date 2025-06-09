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

-- CreateTable
CREATE TABLE `diario` (
    `id_diario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `exercicio_feitos` INTEGER NOT NULL,
    `calorias_gastas` DOUBLE NOT NULL,
    `copos_bebidos` INTEGER NOT NULL,

    PRIMARY KEY (`id_diario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proficional` (
    `id_profissional` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `proficional_email_key`(`email`),
    PRIMARY KEY (`id_profissional`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfissionalUser` (
    `id_profissional_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_profissional` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_profissional_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meditacao` (
    `id_meditacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_meditacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medUser` (
    `id_med_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_meditacao` INTEGER NOT NULL,

    PRIMARY KEY (`id_med_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treino` (
    `id_treino` INTEGER NOT NULL AUTO_INCREMENT,
    `grupomusc` ENUM('UM', 'DOIS', 'TRES', 'QUATRO', 'CINCO') NOT NULL,
    `nivel` ENUM('UM', 'DOIS', 'TRES') NOT NULL,

    PRIMARY KEY (`id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TreinoUser` (
    `id_treino_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_treino` INTEGER NOT NULL,

    PRIMARY KEY (`id_treino_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DadosFisicos` ADD CONSTRAINT `DadosFisicos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DadosMentais` ADD CONSTRAINT `DadosMentais_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diario` ADD CONSTRAINT `diario_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfissionalUser` ADD CONSTRAINT `ProfissionalUser_id_profissional_fkey` FOREIGN KEY (`id_profissional`) REFERENCES `proficional`(`id_profissional`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfissionalUser` ADD CONSTRAINT `ProfissionalUser_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medUser` ADD CONSTRAINT `medUser_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medUser` ADD CONSTRAINT `medUser_id_meditacao_fkey` FOREIGN KEY (`id_meditacao`) REFERENCES `meditacao`(`id_meditacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinoUser` ADD CONSTRAINT `TreinoUser_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinoUser` ADD CONSTRAINT `TreinoUser_id_treino_fkey` FOREIGN KEY (`id_treino`) REFERENCES `Treino`(`id_treino`) ON DELETE RESTRICT ON UPDATE CASCADE;
