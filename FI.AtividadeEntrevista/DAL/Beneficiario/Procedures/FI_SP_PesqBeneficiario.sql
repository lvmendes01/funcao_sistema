CREATE PROCEDURE FI_SP_PesqBeneficiario
    @iniciarEm INT = NULL,
    @quantidade INT = NULL,
    @campoOrdenacao NVARCHAR(50) = NULL,
    @crescente BIT = NULL,
    @IDCLIENTE BIGINT
AS
BEGIN
    SELECT CPF, NOME, ID 
    FROM BENEFICIARIOS WITH(NOLOCK) 
    WHERE IDCLIENTE = @IDCLIENTE
    ORDER BY 
        CASE WHEN @campoOrdenacao IS NULL THEN ID ELSE 
        CASE WHEN @campoOrdenacao = 'CPF' THEN CPF 
             WHEN @campoOrdenacao = 'NOME' THEN NOME 
        END END 
    OFFSET @iniciarEm ROWS
    FETCH NEXT @quantidade ROWS ONLY;
END