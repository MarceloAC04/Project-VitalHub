USE VitalHub_G5M-V2;

-- Selecionando todos os endereços
SELECT * FROM dbo.Enderecos;

INSERT INTO
	dbo.Enderecos
VALUES
	(NEWID(), '09510200', 'Rua Niterói', 180);



-- Selecionando todos os tipos de usuários
SELECT * FROM dbo.TiposUsuario;

INSERT INTO dbo.TiposUsuario VALUES (NEWID(), 'Medico'), (NEWID(), 'Paciente');



-- Selecionando todos os usuários
SELECT * FROM dbo.Usuarios;

INSERT INTO
	dbo.Usuarios
VALUES
	(NEWID(), '3E24F6C2-33D4-4DB4-8DB4-E4CB5642226E', 'Lucas Silveira Portal', 'lucas.portal@gmail.com', 'medico123', 'string'),
	(NEWID(), '3E24F6C2-33D4-4DB4-8DB4-E4CB5642226E', 'Carlos Roque', 'carlos.roque@gmail.com', 'medico123', 'string'),
	(NEWID(), '54D9155B-AC81-4FC0-AF9C-74BF484FA874', 'Martin Lorenzo', 'martin_ferreira@gmail.com', 'paciente123', 'string'),
	(NEWID(), '54D9155B-AC81-4FC0-AF9C-74BF484FA874', 'Heitor Paulo Campos', 'heitor-campos80@gmail.com', 'paciente123', 'string');

UPDATE dbo.Usuarios SET senha = '$2y$10$kZROpWHidaGEbQdfvq3SpeVPGiNcpLQHAOcENJbblYV0aAqXoHnYO' WHERE id = 'F63A83C9-35C7-4BDE-940D-5B07303D8F02';


-- Selecionando todas as especialidades
SELECT * FROM dbo.Especialidades;

INSERT INTO
	dbo.Especialidades
VALUES
	(NEWID(), 'Pediatra');



-- Selecionando todos os médicos
SELECT * FROM dbo.Medicos;

INSERT INTO
	dbo.Medicos
VALUES
	('F63A83C9-35C7-4BDE-940D-5B07303D8F02', '51B59443-4109-4C7A-AB91-1D62F0BA6AC2', '123456789'),
	('04030137-BA59-42CA-9320-1CD586278B7B', '117231C8-CAFB-487C-A082-9C781EB47A02', '987654321');



-- Selecionando todos os pacientes
SELECT * FROM dbo.Pacientes;

INSERT INTO
	dbo.Pacientes
VALUES
	('E4F4A3B1-5AED-4981-8336-7E7A5440AD1F', '2000-01-01', '391166037', '01318181801', 'A13E687B-D94F-41D4-AC8A-AA1E4216D9CA'),
	('683F4955-7BEF-4154-AA38-F7215AD0DCD9', '2001-02-02', '473972438', '25319361815', 'A13E687B-D94F-41D4-AC8A-AA1E4216D9CA');



-- Selecionando todos os niveis
SELECT * FROM dbo.NiveisPrioridade;

INSERT INTO 
	dbo.NiveisPrioridade
VALUES
	(NEWID(), 0), -- Rotina
	(NEWID(), 1), -- Exame
	(NEWID(), 2); -- Urgencia



-- Selecionando todas as situasões
SELECT * FROM dbo.Situacoes;

INSERT INTO
	dbo.Situacoes
VALUES
	(NEWID(), 'Pendentes'),
	(NEWID(), 'Realizados'),
	(NEWID(), 'Cancelados');



-- Selecionando todas as clínicas
SELECT * FROM dbo.Clinicas;

INSERT INTO
	dbo.Clinicas
VALUES
	(NEWID(), 'Clínica Médica Vida & Saúde', '12345678000190', 'Clínica Médica Vida & Saúde', -23.5505, -46.6333, 'clinica.vidasaude@gmail.com'),
	(NEWID(), 'Centro Médico São Paulo', '23456789000101', 'Centro Médico São Paulo', -23.5674, -46.6482, 'medico.saopaulo@gmail.com');