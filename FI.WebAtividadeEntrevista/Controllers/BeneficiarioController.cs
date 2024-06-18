﻿using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using System.Threading.Tasks;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                model.Id = bo.Incluir(new Beneficiario()
                {
                    IdCliente = model.IDCLIENTE,
                    Nome = model.Nome,
                    CPF = model.CPF.Replace(".", "").Replace("-", "")
                });


                return Json("Cadastro efetuado com sucesso");
            }
        }



        [HttpPost]
        public JsonResult BeneficiariosPeloCliente(long IdCliente)
        {
            try
            {
                List<Beneficiario> clientes = new BoBeneficiario().Consultar(IdCliente);

                //Return result to jTable
                return Json(new { Result = clientes });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }


       
    }
}