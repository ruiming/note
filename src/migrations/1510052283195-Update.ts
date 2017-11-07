import { MigrationInterface, QueryRunner } from 'typeorm'

export class Update1510052283195 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `email` varchar(255) NOT NULL, \
      `name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \
      `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)) ENGINE=InnoDB'
    )
    await queryRunner.query(
      'CREATE TABLE `note_subscribers_user` (`noteId` int(11) NOT NULL, `userId` int(11) NOT NULL, `isRead` tinyint(4) NOT NULL, \
      `isMark` tinyint(4) NOT NULL, PRIMARY KEY(`noteId`, `userId`)) ENGINE=InnoDB'
    )
    await queryRunner.query(
      'CREATE TABLE `site` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `title` varchar(255) NOT NULL, `link` varchar(255) NOT NULL, \
      `favicon` varchar(255), `feed` varchar(255)) ENGINE=InnoDB'
    )
    await queryRunner.query(
      'CREATE TABLE `note` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `title` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, \
      `siteId` int(11) NOT NULL, `summary` varchar(255) NOT NULL, `description` text NOT NULL, `tags` json, \
      `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)) ENGINE=InnoDB'
    )
    await queryRunner.query(
      'CREATE TABLE `setting` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `userId` int(11) NOT NULL) ENGINE=InnoDB'
    )
    await queryRunner.query('CREATE INDEX `ind_1ed80b7f23c4decdc172db1057` ON `note_subscribers_user`(`noteId`)')
    await queryRunner.query('CREATE INDEX `ind_5a1147cf0da16e441b4c98c25f` ON `note_subscribers_user`(`userId`)')
    await queryRunner.query(
      'ALTER TABLE `note_subscribers_user` ADD CONSTRAINT `fk_12b10bb06a0dd5188928d64b6f5` FOREIGN KEY (`noteId`) REFERENCES `note`(`id`)'
    )
    await queryRunner.query(
      'ALTER TABLE `note_subscribers_user` ADD CONSTRAINT `fk_5091ad868ba9853e003864391fb` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)'
    )
    await queryRunner.query(
      'ALTER TABLE `note` ADD CONSTRAINT `fk_de97cd0753b6f7c637f5e23c867` FOREIGN KEY (`siteId`) REFERENCES `site`(`id`)'
    )
    await queryRunner.query(
      'ALTER TABLE `setting` ADD CONSTRAINT `fk_af1d878f41632d72983484172fa` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)'
    )
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `setting` DROP FOREIGN KEY `fk_af1d878f41632d72983484172fa`')
    await queryRunner.query('ALTER TABLE `note` DROP FOREIGN KEY `fk_de97cd0753b6f7c637f5e23c867`')
    await queryRunner.query('ALTER TABLE `note_subscribers_user` DROP FOREIGN KEY `fk_5091ad868ba9853e003864391fb`')
    await queryRunner.query('ALTER TABLE `note_subscribers_user` DROP FOREIGN KEY `fk_12b10bb06a0dd5188928d64b6f5`')
    await queryRunner.query('ALTER TABLE `note_subscribers_user` DROP INDEX `ind_5a1147cf0da16e441b4c98c25f`')
    await queryRunner.query('ALTER TABLE `note_subscribers_user` DROP INDEX `ind_1ed80b7f23c4decdc172db1057`')
    await queryRunner.query('DROP TABLE `setting`')
    await queryRunner.query('DROP TABLE `note`')
    await queryRunner.query('DROP TABLE `site`')
    await queryRunner.query('DROP TABLE `note_subscribers_user`')
    await queryRunner.query('DROP TABLE `user`')
  }
}
