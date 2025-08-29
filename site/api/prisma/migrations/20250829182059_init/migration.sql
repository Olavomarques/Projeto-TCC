-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `nascimento` DATETIME(3) NOT NULL,
    `genero` ENUM('MASCULINO', 'FEMININO') NOT NULL,

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
    `sexo` ENUM('MASCULINO', 'FEMININO') NOT NULL,
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
CREATE TABLE `Diario` (
    `id_diario` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `exercicio_feitos` INTEGER NOT NULL,
    `calorias_gastas` DOUBLE NOT NULL,
    `copos_bebidos` INTEGER NOT NULL,
    `metros_andados` INTEGER NOT NULL,
    `dia` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_diario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meditacao` (
    `id_meditacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_meditacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedUser` (
    `id_med_user` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_meditacao` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duracao` INTEGER NOT NULL,

    PRIMARY KEY (`id_med_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercicio` (
    `id_exercicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_exercicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerSelec` (
    `id_ExerSelec` INTEGER NOT NULL AUTO_INCREMENT,
    `id_exercicio` INTEGER NOT NULL,
    `series` INTEGER NOT NULL,
    `repeticoes` INTEGER NOT NULL,
    `peso` DOUBLE NULL,

    PRIMARY KEY (`id_ExerSelec`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TreinosLink` (
    `id_link` INTEGER NOT NULL AUTO_INCREMENT,
    `id_ExerSelec` INTEGER NOT NULL,
    `id_treino` INTEGER NOT NULL,

    PRIMARY KEY (`id_link`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treino` (
    `id_treino` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DadosFisicos` ADD CONSTRAINT `DadosFisicos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DadosMentais` ADD CONSTRAINT `DadosMentais_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diario` ADD CONSTRAINT `Diario_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedUser` ADD CONSTRAINT `MedUser_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedUser` ADD CONSTRAINT `MedUser_id_meditacao_fkey` FOREIGN KEY (`id_meditacao`) REFERENCES `Meditacao`(`id_meditacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerSelec` ADD CONSTRAINT `ExerSelec_id_exercicio_fkey` FOREIGN KEY (`id_exercicio`) REFERENCES `Exercicio`(`id_exercicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinosLink` ADD CONSTRAINT `TreinosLink_id_ExerSelec_fkey` FOREIGN KEY (`id_ExerSelec`) REFERENCES `ExerSelec`(`id_ExerSelec`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinosLink` ADD CONSTRAINT `TreinosLink_id_treino_fkey` FOREIGN KEY (`id_treino`) REFERENCES `Treino`(`id_treino`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treino` ADD CONSTRAINT `Treino_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
