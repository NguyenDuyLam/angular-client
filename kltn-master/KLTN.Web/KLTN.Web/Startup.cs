using KLTN.Models.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using KLTN.Common.DTO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using KLTN.Services.Interfaces;
using KLTN.Services.BO;
using AutoMapper;
using KLTN.ViewModels.ProfileMapper;
using Microsoft.Extensions.Logging;
using KLTN.Common.Interfaces;
using KLTN.Common.Abstracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System;

namespace KLTN.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory


            // Configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSetting");
            services.Configure<AppSetting>(appSettingsSection);

            var appSettings = appSettingsSection.Get<AppSetting>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secrect);

            //Authentication Middleware
            services.AddAuthentication(o =>
            {
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = appSettings.Site,
                    ValidAudience = appSettings.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireLoggedIn", policy => policy.RequireRole("Administrator", "Member"));
                options.AddPolicy("RequireAdministratorRole", policy => policy.RequireRole("Administrator"));
            });

            var test = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<KLTNDatabaseContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), opt => opt.MigrationsAssembly("KLTN.Models"))
            );
            //Add Common Services

            services.AddScoped<IUnitOfWork, UnitOfWork<KLTNDatabaseContext>>();

            //Add Services
            services.AddScoped<IUserServices, UserServices>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            Mapper.Initialize(cfg => cfg.AddProfile<MappingProfile>());

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "KLTN API", Version = "v1" });
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "api-docs/{documentName}/swagger.json";
            });
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "swagger";
                c.SwaggerEndpoint("/api-docs/v1/swagger.json", "App English");
                c.OAuthClientId("Swagger");
                c.OAuthAppName("Medata Management API");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

        }
    }
}
