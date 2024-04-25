USE [VitalHub_G5M-V3];

-- Selecionando todos os endere�os
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '01033-001', 'Avenida C�sper L�bero', 573, -23.536436, -46.635772, 'S�o Paulo');
	(NEWID(), '09510200', 'Rua Niter�i', 180, -23.615051, -46.570692, 'S�o Caetano do Sul');



-- Selecionando todos os tipos de usu�rios
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usu�rios
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), 'EE4372F4-C451-4CD7-B9F8-CE69BE1320D3', 'Lucas Silveira', 'lucas.portal@gmail.com', 'medico123', 'string'),
	(NEWID(), 'BE77826B-B330-423B-A8F3-BDA8C0FB3050', 'Heitor Paulo Campos', 'heitor80@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = '1A0824F4-C774-4CD1-9BDE-D615444B198F';
DELETE FROM dbo.Usuarios WHERE id = '32134B48-832E-4929-9BA3-2F726343D102'

-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra');



-- Selecionando todos os m�dicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('F63A83C9-35C7-4BDE-940D-5B07303D8F02', '910D82CF-404A-4A7A-9B39-E343823842F9', '123456789'),
	('04030137-BA59-42CA-9320-1CD586278B7B', '3FA85F64-5717-4562-B3FC-2C963F66AFA6', '987654321');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('BE77826B-B330-423B-A8F3-BDA8C0FB3050', '2014-01-01', '391166037', '01318181801', 'D3EA3CA3-FF86-46C3-AF67-570FC0D5FE1B')



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situas�es
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as cl�nicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Cl�nica M�dica Vida & Sa�de', '12345678000190', 'Cl�nica M�dica Vida & Sa�de','clinica.vidasaude@gmail.com', 'EC42E2A6-E73D-46E7-B059-0E8B67E63C02')
