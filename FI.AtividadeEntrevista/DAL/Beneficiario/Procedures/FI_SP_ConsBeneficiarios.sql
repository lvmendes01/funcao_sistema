﻿
CREATE PROC FI_SP_ConsBeneficiarios @IDCLIENTE BIGINT
AS
BEGIN
	
		SELECT CPF, NOME,  ID FROM BENEFICIARIOS WITH(NOLOCK) WHERE IDCLIENTE = @ID
END