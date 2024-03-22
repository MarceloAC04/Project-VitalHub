SELECT TOP (1000) [ID]
      ,[TipoUsuario]
  FROM [VitalHub_G5M].[dbo].[TiposUsuario]


  insert into TiposUsuario values(newid(), 'Paciente'), (newid(), 'Medico')